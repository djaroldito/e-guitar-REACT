const fs = require("fs")
const path = require("path")

const { Router } = require("express")
const router = Router()

const sequelize = require("sequelize")
const { Product } = require("../db.js")
const { where } = require("sequelize")

//  GET /rguitars
//  GET /rguitars?brand="..." &type="..." &color="..."
// Pagination: limit=4 (items per page), page=1 (currentPage)
router.get("/", async (req, res) => {
	try {
		const { brand, type, color, fullName, page=1, size=4 } = req.query

		// if no product load form json
		await loadProductData()

		const whereQuery = {}
		// check if there are filter parameters
		if (brand || type || color || fullName) {
			const op = sequelize.Op
			// ilike trabaja entre mayusculas y minusculas y de cierta forma te acelera los procesos
			if (brand) whereQuery.brand = { [op.iLike]: `%${brand}%` }
			if (type) whereQuery.type = { [op.iLike]: `%${type}%` }
			if (color) whereQuery.color = { [op.iLike]: `%${color}%` }
			if (fullName) {
				whereQuery[op.or] = {
					namesQuery: sequelize.where(
						sequelize.fn(
							"concat",
							sequelize.col("brand"),
							" ",
							sequelize.col("model")
						),
						{
							[op.iLike]: `%${fullName}%`,
						}
					),
				}
			}
		}

        // get values for query
		const { limit, offset } = getPagination(page, size)
        // find data and make object for frontend
		Product.findAndCountAll({ where: whereQuery, limit, offset })
			.then((data) => {
                const response = getPagingData(data, page, limit)
				res.send(response)
			})
			.catch((err) => {
				res.status(500).send({
					message:
						err.message || "Some error occurred.",
				})
            })

	} catch (error) {
		console.error(error.message)
		res.status(400).send(error.message)
	}
})


const getPagination = (page, size) => {
    let nPage = page-1
	const limit = size ? +size : 4
	const offset = nPage ? nPage * limit : 0

	return { limit, offset }
}
const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: products } = data
	const currentPage = page ? +page : 1
	const pageCount = Math.ceil(totalItems / limit)

	return { products, pageCount, currentPage, totalItems }
}



// GET /rguitars/{idGuitar}
router.get("/:idGuitar", async (req, res) => {
	const { idGuitar } = req.params
	try {
		//Traigo el id por parametro
		const guitar = await Product.findOne({
			where: {
				id: idGuitar.toUpperCase(),
			},
		})
		if (guitar) {
			//si encuentra el id
			return res.status(200).json(guitar)
		} else {
			return res.status(404).send("NOT FOUND")
		}
	} catch (error) {
		res.status(404).send(error.message)
	}
})

/**
 * CRUD PRODUCT
 ***************
 */

// POST /rguitars
router.post("/", async (req, res) => {
	//res.sendStatus(200)
	const {
		brand,
		model,
		img,
		color,
		price,
		strings,
		description,
		stock,
		discount,
		type,
		leftHand,
		aditionalInformation,
	} = req.body

	try {
		//compruebo que esten todos los parametros requeridos
		if (
			brand &&
			model &&
			img &&
			color &&
			price &&
			strings &&
			description &&
			type
		) {
			const newGuitar = await Product.create({
				fullname: brand + " " + model,
				brand,
				model,
				img,
				color,
				price,
				strings,
				description,
				stock,
				discount,
				type,
				leftHand,
				aditionalInformation,
			})
			res.status(200).json(newGuitar)
		} else {
			return res.status(400).send("Faltan parametros")
		}
	} catch (error) {
		return res.status(400).send(error.message)
	}
})

// PUT /rguitars/{idGuitar}
router.put("/:idGuitar", async (req, res) => {
	try {
		const { idGuitar } = req.params
		const {
			brand,
			model,
			img,
			color,
			price,
			strings,
			description,
			stock,
			discount,
			type,
			leftHand,
			aditionalInformation,
		} = req.body
		// check required info
		if (
			!brand ||
			!model ||
			!img ||
			!color ||
			!price ||
			!strings ||
			!description ||
			!type
		) {
			res.status(400).send("Faltan parametros")
		} else {
			await Product.update(
				{
					fullName: brand + " " + model,
					brand,
					model,
					img,
					color,
					price,
					strings,
					description,
					stock,
					discount,
					type,
					leftHand,
					aditionalInformation,
				},
				{
					where: {
						id: idGuitar,
					},
				}
			)
			res.status(200).send("Producto actualizado!")
		}
	} catch (error) {
		res.status(400).send(error.message)
	}
})

// DELETE /rguitars/{idGuitar}
router.delete("/:idGuitar", async (req, res) => {
	try {
		const { idGuitar } = req.params
		// softdelete
		await Product.destroy({
			where: {
				id: idGuitar,
			},
		})
		res.status(200).send("Se ha eliminado el producto!")
	} catch (error) {
		res.status(400).send(error.message)
	}
})

/**
 * check if Product has records, otherwise load them from guitarJson
 */
const loadProductData = async () => {
	try {
		// get all guitars from database
		let bdGuitar = await Product.findAll()
		// if no guitars loaded
		if (bdGuitar.length === 0) {
			// read from guitarJson and bulk to database
			const guitarJson = fs.readFileSync(
				path.join(__dirname, "../../../guitar.json")
			)
			const guitars = JSON.parse(guitarJson)
			const products = guitars.map((guitar) => {
				return {
					brand: guitar.brand,
					model: guitar.model,
					fullName: guitar.fullName[0] + " " + guitar.fullName[1],
					img: guitar.img.join(","),
					color: guitar.color.join(","),
					price: guitar.price.toFixed(2),
					strings: guitar.strings,
					description: guitar.description,
					stock: guitar.stock,
					discount: guitar.discount.replace("%", ""),
					type: guitar.type.toLowerCase(),
					leftHand: guitar["left-hand"],
					aditionalInformation: guitar["Additional-information"],
				}
			})
			await Product.bulkCreate(products)
		}
	} catch (error) {
		throw new Error(error.message)
	}
}

module.exports = router
