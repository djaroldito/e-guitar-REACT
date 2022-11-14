const { Router } = require("express")
const router = Router()
const sequelize = require("sequelize")
const { User, DiscountCode  } = require("../../db")
const { getPagination, updateOrCreate } = require("./utils")

router.get("/", async (req, res) => {
	try {
		// pagination
		const [page, size] = JSON.parse(req.query.range)
		const { limit, offset } = getPagination(page, size)
		// sort
        // const [sort, order] = JSON.parse(req.query.sort)
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

		DiscountCode.findAndCountAll({
			// where: whereQuery,
			limit,
			offset,
			order: orderQuery,
			distinct: true,
			include: [
				{
					model: User
				}
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

router.get("/:id", async (req, res) => {
    const { id } = req.params
	try {
		//Get by Id
		const coupon = await DiscountCode.findOne({
			where: {
				id: id,
			},
		})
        if (coupon) {
			return res.status(200).json(coupon)
		} else {
			return res.status(404).send("NOT FOUND")
		}
	} catch (error) {
		res.status(404).send(error.message)
	}
})


router.post("/", async (req, res) => {

    const data = { ...req.body, code: req.body.code.toUpperCase() }
	const result = await updateOrCreate(DiscountCode, "", data)

	if (result.data) {
		res.status(200).send(result.data)
    } else {
		res.status(409).send({ error: result.error })
	}
})

router.put("/:id", async (req, res) => {

    const { id } = req.params
    const data = { ...req.body, code: req.body.code.toUpperCase() }
	const result = await updateOrCreate(DiscountCode, { id: id }, data)

	if (result.data) {
		res.status(200).send(result.data)
	} else {
		res.status(400).send(result.error ? result.error : "Update Error")
	}
})


router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params
		// softdelete
		const deleted = await DiscountCode.destroy({
			where: {
				id: id,
			},
		})
		res.sendStatus(200)
	} catch (error) {
		res.status(400).send(error.message)
	}
})

module.exports = router
