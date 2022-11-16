const {Router} = require('express');
const { User, Product, Cart } = require("../db.js")
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const router =  Router();


router.get('/', async (req, res) => {
    const {userID} = req.query;

    const UserCart = await User.findAll({
        where: {
            id:userID
        },
        include: Product
    })
    res.json(UserCart);
})

router.post('/', async (req, res) => {
    const {userID} = req.query;
    const userCart = req.body;

    await Cart.destroy({
        where: {
            userId: userID
        }
    })

    const cartMapped = userCart.map(product => {
        return{
                quantity: product.cart.quantity,
                productId: product.id,
                color: product.cart.color,
                userId: parseInt(userID)
            }

    })

    await Cart.bulkCreate(cartMapped)

    res.send();

})
router.put('/', async (req, res) => {
    const {userID, productID, quantity} = req.query;

    await Cart.update(
        {
            quantity: quantity
        },{
            where: {
                [Op.and]: [
                    {userId: userID},
                    {productId: productID}
                ]
            }
        }
    )
    res.send();
})
router.delete('/', async (req, res) => {
    const {userID, productID} = req.query;

   await Cart.destroy(
        {
            where: {
                userId: userID
            }
        }
    )
    res.send();
})


module.exports= router