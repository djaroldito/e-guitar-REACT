const fs = require("fs")
const path = require("path")
const { Router } = require("express")
const router = Router()

const sequelize = require("sequelize")

const { Product, Review, User } = require("../db.js")


router.post("/:idGuitar", async (req, res) => {
	//res.sendStatus(200)
	const {	stars, review, user } = req.body
    const {idGuitar} = req.params

	try {
		//compruebo que esten todos los parametros requeridos
		if (stars && review && user) {
			const newReview = await Review.create({
                stars,
                message: review, 
                userId: user,
                productId: idGuitar
			})
			res.status(200).json(newReview)
		} else {
			return res.status(400).send("Faltan parametros")
		}
	} catch (error) {
		return res.status(400).send(error.message)
	}
})

module.exports = router