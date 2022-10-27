const { Router } = require("express")

const router = Router()
const { User } = require("../db.js")

/**  GET /rusers/login */
router.get("/login", async (req, res) => {
	try {
		const { email, password } = req.query

		// if no users load defaul
		await loadAdminUserData()

		if (!email || !password) {
			res.status(400).send("Faltan parametros")
		} else {
			const user = await User.findOne({
				where: {
					email,
					password,
				},
			})
			if (user) {
				return res.status(200).json(user)
			} else {
				return res.status(404).send("Email o Password erróneos")
			}
		}
	} catch (error) {
		res.status(400).send(error)
	}
})

/**
 * load defaul admin user
 */
const loadAdminUserData = async () => {
	try {
		// get all users from database
		let dbUsers = await User.findAll()
		// if no users loaded
		if (dbUsers.length === 0) {
			await User.create({
				email: "admin@mail.com",
                password: "admin",
                isAdmin: true,
			})
		}
	} catch (error) {
		throw new Error(error.message)
	}
}

module.exports = router
