const {Router} = require('express');
const axios = require('axios');
const { Order } = require("../db.js")
const {PAYPAL_API, PAYPAL_API_SECRET, PAYPAL_API_CLIENT} = require('../paymentConfig.js');
const router =  Router();



router.post('/create-order', async (req, res) => {
    const products = req.body;
    const productsMapped = products.map(product => 
        (
                {   
                    reference_id: product.id,
                    amount:{
                        currency_code: "USD",
                        value: `${product.price * product.Cart.quantity}`
                    }
                }
            )
        );
    try{
        const order = {
            intent: "CAPTURE",
            purchase_units: productsMapped,
            application_context: {
                brand_name: "E-commerce Guitar",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: "http://localhost:3001/payments/capture-order",
                cancel_url: "http://localhost:3001/payments/cancel-order"
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
        res.status(500).send('Something Went Wrong');
    }
});

router.get('/capture-order', async (req, res) => {

    try{const {token} = req.query;
    
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
            auth:{
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })
    
    res.redirect('http://localhost:3000/payment/validation');}
    catch(error){
        res.redirect('http://localhost:3000/payment/validation');
    }
})

router.get('/cancel-order', (req, res) => {
    res.redirect('http://localhost:3000/home');
})

module.exports = router;