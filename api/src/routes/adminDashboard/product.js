const { Router } = require("express")
const router = Router()
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
		const filter = JSON.parse(req.query.filter)
		const whereQuery = ""
		Product.findAndCountAll({
			order: orderQuery,
			where: whereQuery,
			limit,
			offset,
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
		})
        if (product) {
            // add images array for visualization
            product.dataValues.img = product.img.split(',').map(x =>{ return {src:x} })
			return res.status(200).json(product)
		} else {
			return res.status(404).send("NOT FOUND")
		}
	} catch (error) {
		res.status(404).send(error.message)
	}
})

router.post("/", async (req, res) => {

	const result = await updateOrCreate(Product, {}, req.body)

	if (result.data) {
		res.status(200).send(result.data)
    } else {
        res.status(400).send( result.error ? result.error : 'Create Error' )
    }
})

router.put("/:id", async (req, res) => {

	const { id } = req.params
	const result = await updateOrCreate(Product, { id: id }, req.body)

	if (result.data) {
		res.status(200).send(result.data)
    } else {
        res.status(400).send( result.error ? result.error : 'Update Error' )
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

module.exports = router
