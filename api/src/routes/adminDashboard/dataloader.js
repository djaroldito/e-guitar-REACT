const { Router } = require("express")
const router = Router()

const fs = require("fs")
const path = require("path")

const sequelize = require("sequelize")
const {
	User,
	Review,
	DiscountCode,
	Order,
	OrderDetail,
	Product,
} = require("../../db")
const bcrypt = require("bcrypt")
const saltRounds = 10

router.get("/", async (req, res) => {
	try {
		// load - products
		// read from guitarJson and bulk to database
		const guitarJson = fs.readFileSync(
			path.join(__dirname, "../../mockupData/guitar.json")
		)
		const guitars = JSON.parse(guitarJson)
		const products = guitars.map((guitar) => {
			return {
				brand: guitar.brand,
				model: guitar.model,
				img: guitar.img.join(","),
				color: guitar.color.join(","),
				price: guitar.price.toFixed(2),
				strings: guitar.strings,
				description: guitar.description,
				stock: guitar.stock,
				discount: guitar.discount.replace("%", ""),
				type: guitar.type,
				leftHand: guitar["left-hand"],
				aditionalInformation: guitar["Additional-information"],
			}
		})
        await Product.bulkCreate(products)

        //load - users
        const userJson = fs.readFileSync(
			path.join(__dirname, "../../mockupData/user.json")
        )
        const users = JSON.parse(userJson)
        const hashAdmin = bcrypt.hashSync("admin", saltRounds)
        const hashUser = bcrypt.hashSync("12345678", saltRounds)

        const userData = users.map(user => {
            const avatarImg = `https://xsgames.co/randomusers/assets/avatars/${user.gender.toLowerCase()}/${user.id}.jpg`
            return {
                fullname: user.fullname,
                email: user.email,
                password: user.isAdmin ? hashAdmin : hashUser,
                isAdmin: user.isAdmin ? true: false,
                isActive: user.isActive===false ? false : true,
                avatar: user.isAdmin ? '' : avatarImg,
                createdAt: user.createdAt
            }
        })
        const datausers = await User.bulkCreate(userData)

        // load reviews
        const reviewsJson = fs.readFileSync(
			path.join(__dirname, "../../mockupData/reviews.json")
        )
        const reviews = JSON.parse(reviewsJson)
		const reviewsData = reviews.map((review) => {
			return {
				id: review.id,
				userId: review.userId,
				productId: review.productId,
				stars: review.stars,
                message: review.stars < 3 ? review.message : '',
                createdAt: review.createdAt
			}
		})
        await Review.bulkCreate(reviewsData)

        // load coupon
        const couponJson = fs.readFileSync(
			path.join(__dirname, "../../mockupData/coupon.json")
        )
        const coupons = JSON.parse(couponJson)
		const couponsData = coupons.map((coupon) => {
			return {
				id: coupon.id,
				code: coupon.code.toUpperCase().substring(0, 8),
				discount: coupon.discount,
				userId: coupon.userId,
				isUsed: coupon.isUsed
			}
		})
        await DiscountCode.bulkCreate(couponsData)

        // load order
        const orderJson = fs.readFileSync(
			path.join(__dirname, "../../mockupData/orders.json")
        )
        const orders = JSON.parse(orderJson)
        const ordersData = orders.map((ord) => {
			return {
				id: ord.id,
				orderDate: ord.createdAt.substring(0, 10),
				orderStatus: ord.orderStatus,
				deliveryStatus: ord.deliveryStatus,
                total: ord.total,
                aditionalDetails: ord.aditionalDetails,
                createdAt: ord.createdAt,
                userId: Math.ceil(Math.random() * 50),
			}
        })
        await Order.bulkCreate(ordersData)

        const details = orders.map((ord) => {
            const detail = ord.orderDetail.map(d => {
                return {
                    orderId: ord.id,
                    productId: d.productId,
                    color: d.color,
                    quantity: d.quantity
                }
            })
            return detail
        })

        const detailsData = details.flat()
        await OrderDetail.bulkCreate(detailsData)

		res.status(200).send("Data created")
	} catch (error) {
		console.error(error.message)
		res.status(400).send(error.message)
	}
})

module.exports = router
