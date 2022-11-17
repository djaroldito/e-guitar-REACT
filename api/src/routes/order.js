const {Router, query} = require('express');
const { Order, Product, OrderDetail } = require("../db.js");
const { route } = require('./reviews.js');
const router =  Router();
const {Op} = require('sequelize')

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
    
    const order = await Order.findOne({
        where: {
            id: id
        },
    });
    const orderDetail = await OrderDetail.findAll({
        where: {
            orderId: id
        },
        include: Product
    })
    
    res.json({...order.dataValues, orderDetail: [...orderDetail]});
})

router.get('/getorderdetail', async (req, res) => {
    const {userId, Id} = req.query
   
    
   
    try {
        const orders = await Order.findAll({
            where:{
                userId: userId
            }, 
            include:[{model:OrderDetail,where:{productId: Id}}]
        })
        res.json(orders)
    } catch (error) {
        res.send(error.message)
    }

}

)



module.exports=router