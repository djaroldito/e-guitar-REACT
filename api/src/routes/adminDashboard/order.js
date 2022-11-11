const { Router } = require("express")
const router = Router()
const sequelize = require("sequelize")
const { Order, OrderDetail, User, Product } = require("../../db")
const { getPagination } = require("./utils")

router.get("/", async (req, res) => {
	try {
		// pagination
		const [page, size] = JSON.parse(req.query.range)
		const { limit, offset } = getPagination(page, size)
		// sort
        const [sort, order] = JSON.parse(req.query.sort)
        let orderQuery = ''
        // if (sort) {
        //     if (sort === 'user.email') {
        //         orderQuery = [[User,'email',order]]
        //     } else if (sort === 'product.brand') {
        //         orderQuery = [[Product,'brand',order]]
        //     } else {
        //         orderQuery = [[sort, order]]
        //     }
        // }
        // filter
		// const { type, brand, q } = JSON.parse(req.query.filter)
		// const whereQuery = {}
		// const op = sequelize.Op
		// if (brand) whereQuery.brand = { [op.iLike]: `%${brand}%` }
        // if (type) whereQuery.type = { [op.iLike]: `%${type}%` }
        // if (q) {
		// 		whereQuery[op.or] = {
		// 			namesQuery: sequelize.where(
		// 				sequelize.fn(
		// 					"concat",
		// 					sequelize.col("type"),
		// 					" ",
		// 					sequelize.col("brand"),
		// 					" ",
		// 					sequelize.col("model"),
		// 					" ",
		// 					sequelize.col("color")
		// 				),
		// 				{
		// 					[op.iLike]: `%${q}%`,
		// 				}
		// 			),
		// 		}
		// 	}

		Order.findAndCountAll({
			// where: whereQuery,
			limit,
			offset,
			order: orderQuery,
			distinct: true,
			include: [
				{
					model: User,
					required: true,
				},
				{
					model: OrderDetail,
					required: true,
				},
			],
		})
			.then((data) => {
				res.send({ data: data.rows, total: data.count })
			})
			.catch((err) => {
				console.log(err.message)
				res.status(500).send({
					message: err.message || "Some error occurred.",
				})
			})
	} catch (error) {
		console.log(error.message)
		res.status(404).send(error)
	}
})


module.exports = router
