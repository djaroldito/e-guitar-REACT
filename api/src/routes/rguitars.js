const fs = require("fs")
const path = require("path")

const { Router } = require("express")
const router = Router()

const sequelize = require("sequelize")
const { Product } = require("../db.js")

//  GET /rguitars
//  GET /rguitars?brand="..." &type="..." &color="..."
router.get("/", async (req, res) => {
	try {
		const { brand, type, color, fullName } = req.query

		// if no product load form json
		await loadProductData()

		// check if there are filter parameters
		if (brand || type || color || fullName ) {
			const whereQuery = {}
			// ilike trabaja entre mayusculas y minusculas y de cierta forma te acelera los procesos
			if (brand) whereQuery.brand = { [sequelize.Op.iLike]: `%${brand}%` }
			if (type) whereQuery.type = { [sequelize.Op.iLike]: `%${type}%` }
            if (color) whereQuery.color = { [sequelize.Op.iLike]: `%${color}%` }
            if (fullName) whereQuery.fullName = { [sequelize.Op.iLike]: `%${fullName}%` }

			const guitar = await Product.findAll({
				where: whereQuery,
			})
			// if found send guitar, else NOT FOUND
			guitar.length
				? res.status(200).send(guitar)
				: res.status(404).send("NOT FOUND")
		} else {
			// return all guitars
			let allGuitars = await Product.findAll()
			res.status(200).json(allGuitars)
		}
	} catch (error) {
		console.error(error.message)
		res.status(400).send(error.message)
	}
})

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
				fullname: brand + ' ' + model,
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
					fullName: brand + ' ' + model,
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
					fullName: guitar.fullName[0] + ' ' +guitar.fullName[1],
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
