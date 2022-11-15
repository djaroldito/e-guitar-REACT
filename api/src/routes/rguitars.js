const fs = require("fs")
const path = require("path")

const { Router } = require("express")
const router = Router()
const { Op } = require("sequelize");
const sequelize = require("sequelize")
const { Product } = require("../db.js")


//  GET /rguitars
//  GET /rguitars?brand="..." &type="..." &color="..."
// Pagination: limit=4 (items per page), page=1 (currentPage)
router.get('/offers', async (req, res) => {
	try{
		const product = await Product.findAll({
			where:{
				discount: {[Op.gt]: 5}
			}
		})
		res.send(product);
	}catch(error){
		res.status(400).send(error.message)
	}
})
router.get("/", async (req, res) => {
	try {
		
		const { brand, type, color, fullName, page=1, size=6, sortPrice, sortBrand, minPrice, maxPrice  } = req.query

		// if no product load form json
		//await loadProductData()

		const whereQuery = {}
		let orderBy = []
		//let orderByBrand = []
		// check if there are filter parameters
		if (brand || type || color || fullName || sortPrice || sortBrand || minPrice || maxPrice  ) {
			const op = sequelize.Op
			// ilike trabaja entre mayusculas y minusculas y de cierta forma te acelera los procesos
			if (brand) whereQuery.brand = { [op.iLike]: `%${brand}%` }
			if (type) whereQuery.type = { [op.iLike]: `%${type}%` }
			if (color) whereQuery.color = { [op.iLike]: `%${color}%` }
			if (minPrice || maxPrice) whereQuery.price = { [op.between]: [minPrice, maxPrice]}
			//console.log(minPrice, maxPrice)
			if (sortPrice) {
				orderBy = [
					["price", sortPrice],
						]
					}
			if (sortBrand) {
				orderBy = [
					["brand", sortBrand],
						]
				}

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
		Product.findAndCountAll({ where: whereQuery, limit, offset, order: orderBy })
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
	const limit = size ? +size : 6
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
				path.join(__dirname, '../../guitar.json')
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
		}
	} catch (error) {
		throw new Error(error.message)
	}
	
}

module.exports = router