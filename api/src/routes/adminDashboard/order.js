const { Router } = require("express")
const router = Router()
const sequelize = require("sequelize")
const { Order, OrderDetail, User, DiscountCode } = require("../../db")
const { getPagination, updateOrCreate } = require("./utils")

router.get("/", async (req, res) => {
	try {
		// pagination
		const [page, size] = JSON.parse(req.query.range)
		const { limit, offset } = getPagination(page, size)
		// sort
		const [sort, order] = JSON.parse(req.query.sort)
		let orderQuery = ""
		if (sort) {
			if (sort === "user.email") {
				orderQuery = [[User, "email", order]]
			} else {
				orderQuery = [[sort, order]]
			}
		}
		// filter
		const { q } = JSON.parse(req.query.filter)
		const whereQuery = {}
		const op = sequelize.Op
		if (q) {
			whereQuery[op.or] = {
				namesQuery: sequelize.where(
					sequelize.fn(
						"concat",
						" ",
						sequelize.col("user.email"),
						" ",
						sequelize.col("orderStatus"),
						" ",
						sequelize.col("deliveryStatus")
					),
					{
						[op.iLike]: `%${q}%`,
					}
				),
			}
		}

		const data = await Order.findAndCountAll({
			where: whereQuery,
			limit,
			offset,
			order: orderQuery,
			distinct: true,
			include: [
				{
					model: User,
					required: true,
				},
			],
		})

		if (data) {
			res.send({ data: data.rows, total: data.count })
		} else {
			console.log(data.error)
			res.status(500).send({
				error: data.error,
			})
		}

		// .then((data) => {

		//    const sumarize = await Order.findAll({
		//         attributes: ['orderStatus', [sequelize.fn('sum', sequelize.col('total')), 'total']],
		//         group : ['orderStatus'],
		//         raw: true
		//     })

		// 	res.send({ data: data.rows, total: data.count })
		// })
		// .catch((err) => {
		// 	console.log(err.message)
		// 	res.status(500).send({
		// 		message: err.message || "Some error occurred.",
		// 	})
		// })
	} catch (error) {
		console.log(error.message)
		res.status(404).send(error)
	}
})

router.get("/summarize", async (req, res) => {
	const summarize = await Order.findAll({
		attributes: [
			"orderStatus",
			[sequelize.fn("count", sequelize.col("id")), "count"],
			[sequelize.fn("sum", sequelize.col("total")), "total"],
		],
		group: ["orderStatus"],
		raw: true,
		order: [["orderStatus", "ASC"]],
	})
	res.send(summarize)
})
router.get("/chartData", async (req, res) => {
	const data = await Order.findAll({
		where: {
			orderStatus: "PAYMENT COMPLETED",
		},
		attributes: [
			[
				sequelize.fn("date_trunc", "month", sequelize.col("createdAt")),
				"month",
			],
			[sequelize.fn("sum", sequelize.col("total")), "total"],
		],
		group: "month",
		raw: true,
		order: [["month", "ASC"]],
	})
	const formated = data.map((x) => {
		const m = new Date(x.month)
		return {
			month: m.toISOString().substring(0, 7),
			total: x.total,
		}
	})

	res.send(formated)
})

router.get("/:id", async (req, res) => {
	const { id } = req.params
	try {
		//Get by Id
		const order = await Order.findOne({
			where: {
				id: id,
			},
			include: OrderDetail,
		})
		if (order) {
			if (order.code) {
				// coupon applied
				const coupon = await DiscountCode.findOne({
					where: { code: order.code },
				})
				order.dataValues.discount = coupon.discount
			}

			return res.status(200).json(order)
		} else {
			return res.status(404).send("NOT FOUND")
		}
	} catch (error) {
		res.status(404).send(error.message)
	}
})

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params
		// softdelete
		const deleted = await Order.destroy({
			where: {
				id: id,
			},
		})
		res.sendStatus(200)
	} catch (error) {
		res.status(400).send(error.message)
	}
})
router.put("/:id", async (req, res) => {
	const { id } = req.params
	const result = await updateOrCreate(Order, { id: id }, req.body)

	if (result.data) {
		res.status(200).send(result.data)
	} else {
		res.status(400).send(result.error ? result.error : "Update Error")
	}
})

module.exports = router
