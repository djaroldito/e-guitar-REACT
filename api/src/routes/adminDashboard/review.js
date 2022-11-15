const { Router } = require("express")
const router = Router()
const sequelize = require("sequelize")
const { Review, User, Product } = require("../../db")
const { getPagination } = require("./utils")

router.get("/", async (req, res) => {
	try {
		// pagination
		const [page, size] = JSON.parse(req.query.range)
		const { limit, offset } = getPagination(page, size)
		// sort
        const [sort, order] = JSON.parse(req.query.sort)
        let orderQuery = ''
        if (sort) {
            if (sort === 'user.email') {
                orderQuery = [[User,'email',order]]
            } else if (sort === 'product.brand') {
                orderQuery = [[Product,'brand',order]]
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
						sequelize.col("product.brand"),
						" ",
						sequelize.col("product.type"),
						" ",
						sequelize.col("product.model"),
						" ",
						sequelize.col("user.email"),
						" ",
						sequelize.col("message")
					),
					{
						[op.iLike]: `%${q}%`,
					}
				),
			}
		}

		Review.findAndCountAll({
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
				{
					model: Product,
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

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params
		// softdelete
		const deleted = await Review.destroy({
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
