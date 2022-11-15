const { Router } = require("express")
const router = Router()
const sequelize = require("sequelize")
const { Product } = require("../../db")
const { getPagination, updateOrCreate } = require("./utils")

router.get("/", async (req, res) => {
	try {
		// pagination
		const [page, size] = JSON.parse(req.query.range)
		const { limit, offset } = getPagination(page, size)
		// sort
		const orderQuery = [JSON.parse(req.query.sort)]
		// filter
		const { type, brand, q } = JSON.parse(req.query.filter)

		const whereQuery = {}
		const op = sequelize.Op
		if (brand) whereQuery.brand = { [op.iLike]: `%${brand}%` }
		if (type) whereQuery.type = { [op.iLike]: `%${type}%` }
		if (q) {
			whereQuery[op.or] = {
				namesQuery: sequelize.where(
					sequelize.fn(
						"concat",
						sequelize.col("type"),
						" ",
						sequelize.col("brand"),
						" ",
						sequelize.col("model"),
						" ",
						sequelize.col("color")
					),
					{
						[op.iLike]: `%${q}%`,
					}
				),
			}
		}

		Product.findAndCountAll({
			where: whereQuery,
			limit,
			offset,
			order: orderQuery,
			paranoid: false,
		})
			.then((data) => {
				const products = data.rows.map((x) => {
					return {
						...x.dataValues,
						color: x.dataValues.color?.split(/\s*(?:,|$)\s*/),
					}
				})
				res.send({ data: products, total: data.count })
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || "Some error occurred.",
				})
			})
	} catch (error) {
		res.status(404).send(error)
	}
})

router.get("/many", async (req, res) => {
	try {
		const { ids } = req.query
		const data = await Product.findAll({
			where: { id: JSON.parse(ids) },
		})
		res.status(200).send(data)
	} catch (error) {
		console.log("error", error.message)
		res.status(404).send(error)
	}
})

router.get("/:id", async (req, res) => {
	const { id } = req.params
	try {
		//Get by Id
		const product = await Product.findOne({
			where: {
				id: id.toUpperCase(),
            },
            raw:true,
			paranoid: false,
		})
		if (product) {
			// add images array for visualization - regex for trim spaces
			if (product.img) {
				product.img = product.img.split(/\s*(?:,|$)\s*/).map((x) => {
					return { src: x }
				})
			}
			product.color = product.color.split(/\s*(?:,|$)\s*/)
			return res.status(200).json(product)
		} else {
			return res.status(404).send("NOT FOUND")
		}
	} catch (error) {
		res.status(404).send(error.message)
	}
})

router.post("/", async (req, res) => {
	const result = await updateOrCreate(Product, "", req.body)

	if (result.data) {
		res.status(200).send(result.data)
	} else {
		res.status(400).send(result.error ? result.error : "Create Error")
	}
})

router.put("/:id", async (req, res) => {
	const { id } = req.params
	const result = await updateOrCreate(Product, { id: id }, req.body)

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
		const deleted = await Product.destroy({
			where: {
				id: id,
			},
		})
		res.sendStatus(200)
	} catch (error) {
		res.status(400).send(error.message)
	}
})

router.post("/restore/:id", async (req, res) => {
	try {
		const { id } = req.params
		const where = {
			id: id,
		}
		const found = await Product.findOne({
			where,
			paranoid: false,
		})

		if (found) {
			await Product.update({ deletedAt: null }, { where, paranoid: false })
		}
		res.sendStatus(200)
	} catch (error) {
		console.log(error.message)
		res.status(400).send(error.message)
	}
})

module.exports = router
