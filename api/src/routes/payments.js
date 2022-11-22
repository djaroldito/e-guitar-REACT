const {Router} = require('express');
const axios = require('axios');
const { Order, OrderDetail, DiscountCode } = require("../db.js")
const nodemailer = require("nodemailer");
const {PAYPAL_API, PAYPAL_API_SECRET, PAYPAL_API_CLIENT} = require('../paymentConfig.js');
const { Sequelize } = require('sequelize');
const router =  Router();



router.post('/create-order', async (req, res) => {
    const products = req.body;
    const {mail, code, discount} = req.query;
    
    const totalDiscount = (price, quantity, productDiscount, discount) => {
       return ((price * quantity) - (((price * quantity) * (parseInt(productDiscount) + parseInt(discount))) / 100)).toFixed(2)
    }
    const total = (price, quantity) =>{
        return (price * quantity).toFixed(2);
    }

    const productsMapped = products.map(product =>
        (
                {
                    reference_id: product.cart.productId,
                    amount:{
                        currency_code: "USD",
                        value: `${ discount ?  totalDiscount(product.price, product.cart.quantity, product.discount, discount) : total(product.price, product.cart.quantity)}`
                    }
                }
            )
        );
    
        if(code !== null){
        const cupon = await DiscountCode.update({
            isUsed: true },
          { where: {
              code: code,
            },}
        )};
      
        await axios.delete(`${process.env.DOMAIN_PAYMENT}/cart?userID=${products[0].cart.userId}`);
        
        const orderdb = await Order.create({
            orderDate: Sequelize.NOW(),
            orderStatus: "AWAITING PAYMENT",
            deliveryStatus: 'PENDING',
            total: productsMapped.reduce((acc, curr) => acc + (parseFloat(curr.amount.value)), 0),
            userId: products[0].cart.userId,
            code: code,
        });

        const orderDetail = products.map(product => ({
            quantity: product.cart.quantity,
            productId: product.cart.productId,
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
                return_url: `${process.env.DOMAIN_PAYMENT}/payments/capture-order?mail=${mail}&orderId=${orderdb.id}`,
                cancel_url: `${process.env.DOMAIN_PAYMENT}/payments/cancel-order?orderId=${orderdb.id}`
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

        await Order.update({
            paymentLink: response.data.links[1].href
        },{
            where:{
                id: orderdb.id
            }
        }
        )
        
        res.send(response.data.links[1].href);
    /* }
    catch (error){
        console.log(error.message)
        res.status(500).send(error);

    } */
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
            <h3>Hello!</h3>
            <p>Thank you for your purchase, we have received your payment and your order is beign processed!</p>
            <h3>Order Detail</h3>
            <p>id: ${response.data.id}</p>
            <p>state: ${response.data.status}</p>
            <p>you can check your order <a href=${process.env.DOMAIN}/orders/${orderId}>clicking here</a></p>
            <p>Thank you for using GuitarCode </p>`
        }
        sendMail(message);
        //console.log(response);
        res.redirect(`${process.env.DOMAIN}/payment/validation`);
    }
        catch(error){
            res.redirect(`${process.env.DOMAIN}/payment/validation/error`);
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
    res.redirect(`${process.env.DOMAIN}/home`);
})

module.exports = router;