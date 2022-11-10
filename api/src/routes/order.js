const {Router} = require('express');
const { Order, Product } = require("../db.js")
const router =  Router();

router.get('/', async (req, res) => {
    const {userId} = req.query;
    const order = await Order.findAll({
        where: {
            userId: userId
        },
        include: Product
    })
    res.json(order);
})



module.exports=router