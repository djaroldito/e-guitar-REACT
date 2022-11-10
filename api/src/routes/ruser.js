const { Router } = require("express");
const router = Router();
const { User, Product } = require("../db.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");

// NODEMAILER ---------------------------------------------------------------------------------------------------

function sendMail(message) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
    transporter.sendMail(message, function (error, info) {
      if (error) rej(error);
      else res(info);
    });
  });
}

 

const mailRegisterConfirm = async function ({ toUser }) {
  const domain = process.env.DOMAIN;
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    subject: "Guitar Code - Register Activation",
    html: `
        <h3>Hello, ${toUser.fullname}!</h3>
        <p>Thank you for register with us, there's only one more step to go!</p>
        <p>To activate your account please click in this link: <a target="" href=${domain}/activate/${toUser.email}>Activate account</a></p>
        <p>Have a nice day!</p>`,
  };
  console.log("Esto es message: ", message);
  return sendMail(message);
};

const mailFotgotPassword = async function ({toUser}) {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    subject: "Guitar Code - Reset Password",
    html: `
    
    `
  }
}

// REGISTER ---------------------------------------------------------------------------------------------------------------------------

 router.post("/register", async (req, res) => {
  try {
    console.log(req.body)
  const { email, fullname, password, avatar='', isActive=false  } = req.body;

  const hash = bcrypt.hashSync(password, saltRounds);
  //console.log("Esta es la password hash: ", hash);
  const newPendingUser = await User.create({
    fullname,
      email,
      avatar,
      isActive,
      password: hash,
  });
  const mailReg = await mailRegisterConfirm({
    toUser: newPendingUser,
    hash: hash,
  });
    //console.log("Esto es mailRegisterConfirm: ", mailReg);
    return res.status(200).json(newPendingUser);
  } catch (error) {
      console.log(error.message)
  res.status(400).send(error.message);
}
});

//controla que el mail este registrado
router.get("/registerGoogle", async (req, res) => {
  try {
    const { email, userName } = req.query;

    if (!email || !userName) {
      res.status(400).send("faltan cargar datos");
    } else {
      const user = await User.findOne({
        where: {
          email
        },
      });

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(200).json(user);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/activate/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.update({
        isActive: true },
      { where: {
          email: email,
        },}
    );
    if (user) {
      res.redirect("http://localhost:3000/activate");
    } else {
      console.log("Error en la activación ");
    }
  } catch (error) {
    console.log("Error en la activación ", error);
    res.status(422).send(error.message);
  }
});

/**  GET /rusers/login --------------------------------------------------------------------------------------------*/
router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.query;

    // if no users load defaul
    await loadAdminUserData();

    if (!email || !password) {
      res.status(400).send("Faltan parametros");
    } else {
      const user = await User.findOne({
        where: {
          email,
		  isActive: true
        },
        include: Product,
      });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return res.status(200).json(user);
        }
      }
      return res.status(404).send("Email o Password erróneos");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});



router.get("/email", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      res.status(400).send("falta cargar el gmail");
    } else {
      const user = await User.findOne({
        where: {
          email,
        },
        include: Product,
      });

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(200).json(user);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// load defaul admin user ---------------------------------------------------------------------------------

const loadAdminUserData = async () => {
  try {
    // get all users from database
    let dbUsers = await User.findAll();
    // if no users loaded
    if (dbUsers.length === 0) {
      const hash = bcrypt.hashSync("admin", saltRounds);
      await User.create({
        email: "admin@gmail.com",
        password: hash,
        isAdmin: true,
		isActive:true
      });
    //   await User.create({
    //     email: "cliente@gmail.com",
    //     password: hash,
    //     isAdmin: false,
    //   });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// FORGOT PASSWORD ---------------------------------------------------------------------------------------------------------------
router.post("/reset-password", async (req, res) => {
  try {
    const { fullname, email } = req.body;
    console.log("Back reset-pass: ", fullname, email)
    if (!fullname || !email) res.status(400).send("Cannot be empty fields")
  
    const user = await User.findeOne({ 
      where: {
        email
      }});
    console.log("Saliendo del findone en RPassword")
    console.log("Esto es user en el back: ", user);
    if (!user) return res.status(422).send("User doesn't exists!");

    const hash = bcrypt.hashSync(fullname, saltRounds);
    console.log("Esto es hash en RPass: ", hash)

  } catch (error) {
    
  }

})


module.exports = router;
