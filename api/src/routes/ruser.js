const { Router } = require("express")
const router = Router()
const { User } = require("../db.js")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const saltRounds = 10;

// NODEMAILER ---------------------------------------------------------------------------------------------------

function sendMail(message) {
	return new Promise((res, rej) => {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.GOOGLE_USER,
				pass: process.env.GOOGLE_PASSWORD
			}
		});
		transporter.sendMail(message, function (error, info) {
			if (error) rej(error)
			else res(info)
		})
	})
};

const mailRegisterConfirm = async function({toUser, hash}) {
	console.log("MailRegisterConfirm, esto es hash: ", hash)
	console.log("MailRegisterConfirm, esto es toUser.fullname: ", toUser.fullname);
	console.log("MailRegisterConfirmm esto es ")

 	function eliminarSlash(hash) {
		const nuevoHash = hash.replace("/", "*");
		return nuevoHash;
	}
	const hashSeguro = eliminarSlash(hash); 

	const message = {
		from: process.env.GOOGLE_USER,
		to: toUser.email,
		subject: "Guitar Code - Register Activation",
		html: `
		<h3>Hola, ${toUser.fullname}!</h3>
		<p>Gracias por registrarte con nosotros, sólo te queda un último paso!</p>
		<p>Para activar tu cuenta por favor haz click en el siguiente link: <a target="_" href=${process.env.DOMAIN}/activate/${toUser.email}>Activar cuenta</a></p>
		<p>Saludos y gracias por confiar en nosotros! </p>`
	}
	/* href=${process.env.DOMAIN}/activate?hash=${hashSeguro}&?email=${toUser.email} */
	console.log("Esto es message: ", message)	
	return sendMail(message);
};

// NODEMAILER ---------------------------------------------------------------------------------------------------

/* POST /ruser/register  FUNCIÓN ORIGINAL ********/
 /* router.post("/register", async (req, res) => {
    try {
		const { fullname, email, password } = req.body
		if (!email || !password) {
			res.status(400).send("Faltan parámetros")
		} else {
			const hash = bcrypt.hashSync(password, saltRounds)
			const user = await User.create({
				fullname,
				email,
				password: hash, 
			})
			if (user) {
				return res.status(200).json(user)
			}
			return res.status(404).send("Usuario no creado")
		}
	} catch (error) {
		res.status(400).send(error.message)
	}
	$2b$10$.Eygo.0Kjr03ab7F81Ozbu/TA/gbn.pCU.dcv6HoYmZv/yRsnoq4W
});  */

router.post("/register", async (req, res) => {
	try {
		const { email, fullname, password } = req.body;
		
			const hash = bcrypt.hashSync(password, saltRounds);
			console.log("Esta es la password hash: ", hash)

			const newPendingUser = await User.create({
				fullname,
				email,
				password: hash
			})
		const mailReg = await mailRegisterConfirm({toUser: newPendingUser, hash: hash})	
		console.log("Esto es mailRegisterConfirm: ", mailRegisterConfirm);

		/* console.log("Esto es pendingUser: ", newPendingUser)
		 {
			console.log("Entramos al if de newPending")
			const user = await User.findAll({
				where: {
				password: hash,
				isActive: false
				}
				}); 
				console.log("Esto es User", user);
			if(user){
				console.log("Entramos al if final")
				user.isActive = true;
				User.save(user);	
			}
		} */
		if (newPendingUser) return res.status(200).json({message: `User has been activated!`});
	} catch (error) {
		res.status(400).send(error.message);
	}
	
});

 router.get("/activate/:email", async (req, res) => {
 	const { hash, email } = req.params;
		console.log("esto es email: ", email);

/* 	 function eliminarSlash(hash) {
		const nuevoHash = hash.replace("/", "*");
		return nuevoHash;
	  }
	  const hashSeguro = eliminarSlash(hash); */

	try {
 	 	const user = await User.update({
			isActive: true
			}, { 
			where: {
				email: email,
				/* isActive: false */
			}
		}); 
		console.log("Esto es User", user);
/* 		if (user) {
			user.isActive = true;
			console.log("Esto no es User: ", user);
			console.log("Esto es userIsActive: ", user.isActive)
			User.save(user);
			}  */

		res.redirect(`http://localhost:3000/activate`);
 	} catch (error) {
		console.log("Error en la activación ", error)
		res.status(422).send(error.message);
	} 
}) 
 

router.get("/email", async (req,res) => {
    try {
        const {email} = req.query;
        if(!email){
            res.status(400).send("falta cargar el gmail")
        } else {
            const user = await User.findOne({
                where: {
                email,
                }
            })
            if(user){
                return res.status(200).json(user)
            } else {
                return res.status(200).json(user)
            }
        }
    } catch (error){
        res.status(400).send(error)
     }
})

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
					isActive: true
				},
			})
			if (user) {
				const match = await bcrypt.compare(password, user.password)
				if (match) {
					return res.status(200).json(user)
				}
			}
			return res.status(404).send("Email o Password erróneos")
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
			const hash = bcrypt.hashSync("admin", saltRounds)
			await User.create({
				email: "admin@gmail.com",
				password: hash,
				isAdmin: true,
			})
		}
	} catch (error) {
		throw new Error(error.message)
	}
}

module.exports = router
