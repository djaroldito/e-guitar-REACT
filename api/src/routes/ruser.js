const { Router } = require("express");
const router = Router();
const { User, Product, DiscountCode } = require("../db.js");
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
/*   const domain = process.env.DOMAIN; */
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    subject: "Guitar Code - Register Activation",
    html: `
        <h3>Hello, ${toUser.fullname}!</h3>
        <p>Thank you for register with us, there's only one more step to go!</p>
        <p>To activate your account please click in this link: <a target="" href=${process.env.DOMAIN}/${toUser.email}>Activate account</a></p>
        <p>Have a nice day!</p>`,
  };
  console.log("Esto es message: ", message);
  return sendMail(message);
};

const mailDiscountCoupon = async function ({ toUser, discountCode}) {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    subject: "Guitar code - Welcome Gift",
    html: `
    <h3>Hello, ${toUser.fullname}!</h3>
    <p>Thank you for registering with us, we offer you a discount code to use on your first purchase, to applicate the code, please charge at the discount campus on the product you wish!</p>
    <p>Thank you, Guitar Code </p>
    <p>Code: <b>${discountCode}</b></p>
    `
  };
  console.log("mail cupon", message)
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
  const user = await User.findOne({
    where: {
      email
    },
  })
  console.log(user)
  if(user.dataValues.isActive===false){
  const mailReg = await mailRegisterConfirm({
    toUser: newPendingUser,
    hash: hash,
  });
  }
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
 
router.get("/activate", async (req, res) => {
  const { email, discount } = req.query;
  
  try {
    const user = await User.update({
        isActive: true },
      { where: {
          email: email,
        },}
    );
    const userCode = await User.findOne({
    where: {
        email: email,
      }}
  );
    if (user) {
      await mailDiscountCoupon({
        toUser: userCode,
        discountCode: discount
      })
      const discountCode = await DiscountCode.create({
        code: discount,
        discount: 10,
        userId : userCode.id
      }) 
      res.status(200).send("Usuario Activado")
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
// post para codigo de descuento ----------------------------------
router.post('/discountCode', async (req, res) => {
  try {
    const {code, discount, userId} = req.body;
    console.log(code, discount)
    if(!code || !discount || !userId) res.status(400).send('Cannot be empty fields');
    else{
      const discountCode = await DiscountCode.create({
        code,
        discount,
        userId,
      })
      res.status(200).json(discountCode);
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/sendCode', async (req, res) =>{
  try {
    const {code, discount, email} = req.query;
    console.log(code, discount, email)
    if(!code || !discount || !email) res.status(400).send('Cannot be empty fields');
    else{
      const user = await User.findOne({
        where: {
          email,
        },
    })
    console.log("usuarioGOogle",user)
    if(user){
      await mailDiscountCoupon({
        toUser: user,
        discountCode: code
      })
      const discountCode = await DiscountCode.create({
        code: code,
        discount: discount,
        userId : user.id
      })
      res.status(200).send('Send code with exito')
    }else{
      res.status(400).send("User doesn't exists!")
    }
  }
  } catch (error) {
    console.log(error)
  }
})

// get para codigo de descuento ---------------------------------------

router.get('/discountCode', async (req,res) => {
  const {code} = req.query;
  try {
    if(!code) res.status(400).send('Cannot be empty fields');
    else{
      const discountCode = await DiscountCode.findAll({
        where: {
          code: code,
        }
      })
      if(discountCode) res.status(200).json(discountCode);
      else {
        res.status(400).send("code doesn't exists!")
      }
    }
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;
