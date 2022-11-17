
const { Router } = require("express")
const router = Router()



const { Review } = require("../db.js")


router.post("/:idGuitar", async (req, res) => {
	const {	stars, review, user } = req.body
    const {idGuitar} = req.params

	console.log(stars, review, user, idGuitar)

	try {
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