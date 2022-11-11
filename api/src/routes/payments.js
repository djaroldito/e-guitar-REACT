const {Router} = require('express');
const axios = require('axios');
const { Order, OrderDetail } = require("../db.js")
const nodemailer = require("nodemailer");
const {PAYPAL_API, PAYPAL_API_SECRET, PAYPAL_API_CLIENT} = require('../paymentConfig.js');
const { Sequelize } = require('sequelize');
const router =  Router();



router.post('/create-order', async (req, res) => {
    const products = req.body;
    const {mail} = req.query;
    const productsMapped = products.map(product => 
        (
                {   
                    reference_id: product.Cart.productId,
                    amount:{
                        currency_code: "USD",
                        value: `${(product.price * product.Cart.quantity).toFixed(2)}`
                    }
                }
            )
        );
    try{
       const orderdb = await Order.create({
            orderDate: Sequelize.NOW(),
            orderStatus: "AWAITING PAYMENT",
            deliveryStatus: 'PENDING',
            total: productsMapped.reduce((acc, curr) => acc + (parseInt(curr.amount.value)), 0),
            userId: products[0].Cart.userId 
        });
        
        const orderDetail = products.map(product => ({
            quantity: product.Cart.quantity,
            productId: product.Cart.productId,
            orderId: orderdb.id
        })) 

        await OrderDetail.bulkCreate(orderDetail)
        
        
        

        const order = {
            intent: "CAPTURE",
            purchase_units: productsMapped,
            application_context: {
                brand_name: "E-commerce Guitar",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: `http://localhost:3001/payments/capture-order?mail=${mail}&orderId=${orderdb.id}`,
                cancel_url: `http://localhost:3001/payments/cancel-order?orderId=${orderdb.id}`
            }
        }
    
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
    
        const {data: {access_token}} = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', params, {
           headers: {
            'Content-Type': 'application/x-www-form-urlenconded',
           },
            auth: {
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })

        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        
        res.send(response.data.links[1].href);
    }
    catch (error){
        res.status(500).send(error);
    }
});

router.get('/capture-order', async (req, res) => {

    try{
        const {token, mail, orderId} = req.query;

        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
            auth:{
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })

        const order = await Order.findAll({
            where:{
                id:orderId
            }
        });
        console.log(order);
        await Order.update({
            orderStatus: "PAYMENT COMPLETED"
        },{
            where:{
                id:orderId
            }
        })

        function sendMail(message) {
            return new Promise((res, rej) => {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.GOOGLE_USER,
                        pass: process.env.GOOGLE_PASSWORD
                    }
                });
                    transporter.sendMail(message, function (error, info) {
                    if (error) rej(error)
                    else res(info)
                })
            }) 
        }; 
       

        const message = {
            from: process.env.GOOGLE_USER,
            to: mail,
            subject: "Recibo de compra",
            html: `
            <h3>Hola!</h3>
            <p>Gracias por tu compra, tu pago fue recibido y en este momento tu pedido esta siendo procesado</p>
            <h3>Detalle de tu compra</h3>
            <p>id: ${response.data.id}</p>
            <p>estado: ${response.data.status}</p>
            <p>para ver tu pedido haz <a>click aquí</a></p>
            <p>Saludos y gracias por confiar en nosotros! </p>`
        }   
        sendMail(message);
        //console.log(response);
        res.redirect('http://localhost:3000/payment/validation');
    }
        catch(error){
            res.redirect('http://localhost:3000/payment/validation/error');
        }
})

router.get('/cancel-order', async (req, res) => {
    
    const {orderId} = req.query;

    await Order.update({
        orderStatus: "CANCELED"
    },{
        where:{
            id:orderId
        }
    })
    res.redirect('http://localhost:3000/home');
})

module.exports = router;