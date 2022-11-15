const { Router } = require("express")
const router = Router()
const sequelize = require("sequelize")
const { User } = require("../../db")
const { getPagination, updateOrCreate } = require("./utils")
const bcrypt = require("bcrypt")
const saltRounds = 10

router.get("/", async (req, res) => {
	try {
		// pagination
		const [page, size] = JSON.parse(req.query.range)
		const { limit, offset } = getPagination(page, size)
		// sort
		const orderQuery = req.query.sort ? [JSON.parse(req.query.sort)] : []
		// filter
		const { fullname, email, active, admin } = JSON.parse(req.query.filter)

		const whereQuery = {}
		const op = sequelize.Op
		if (fullname) whereQuery.fullname = { [op.iLike]: `%${fullname}%` }
		if (email) whereQuery.email = { [op.iLike]: `%${email}%` }
		if (active !== undefined) {
			whereQuery.isActive = active
		}
		if (admin !== undefined) {
			whereQuery.isAdmin = admin
		}

		User.findAndCountAll({
			where: whereQuery,
			limit,
			offset,
			order: orderQuery,
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
router.get("/many", async (req, res) => {
	try {
        const { ids } = req.query
		const data = await User.findAll({
			where:  { id: JSON.parse(ids)  }
		})
		res.status(200).send(data)
	} catch (error) {
		console.log(error.message)
		res.status(404).send(error)
	}
})

router.get("/:id", async (req, res) => {
	const { id } = req.params
	try {
		//Get by Id
		const user = await User.findOne({
			where: {
				id: id,
			},
		})
		if (user) {
			if (user.avatar) {
				user.avatar = { src: user.avatar }
			}
			return res.status(200).json(user)
		} else {
			return res.status(404).send("NOT FOUND")
		}
	} catch (error) {
		res.status(404).send(error.message)
	}
})

router.post("/", async (req, res) => {
	const result = await updateOrCreate(User, "", req.body)

	if (result.data) {
		res.status(200).send(result.data)
	} else {
		res.status(400).send(result.error ? result.error : "Create Error")
	}
})

router.put("/:id", async (req, res) => {
	const { id } = req.params
	const result = await updateOrCreate(User, { id: id }, req.body)

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
		const deleted = await User.destroy({
			where: {
				id: id,
			},
		})
		res.sendStatus(200)
	} catch (error) {
		res.status(400).send(error.message)
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
			const hash = bcrypt.hashSync("admin", saltRounds)
			const newUser = await User.create({
				email: "admin@gmail.com",
				password: hash,
				isAdmin: true,
				isActive: true,
			})
		}
	} catch (error) {
		console.log(error.message)
		throw new Error(error.message)
	}
}

module.exports = router
