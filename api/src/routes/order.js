const {Router} = require('express');
const { Order, Product } = require("../db.js")
const router =  Router();

router.get('/', async (req, res) => {
    const {userId} = req.query;
    const order = await Order.findAll({
        where: {
            userId: userId
        }
    })
    res.json(order);
})

router.get('/getOrder', async (req, res) => {
    const {id} = req.query;
    console.log(id);
    const order = await Order.findOne({
        where: {
            id: id
        },
        include: Product
    });
    res.json(order);
})



module.exports=router