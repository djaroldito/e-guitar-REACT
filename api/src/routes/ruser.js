const { Router } = require("express");
const router = Router();
const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/**  GET /rusers/login */
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
        },
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
router.get("/registerGoogle", async (req, res) => {
  try {
    const { email,userName } = req.query;

    if (!email || !userName) {
      res.status(400).send("faltan cargar datos");
    } else {
      const user = await User.findOne({
        where: {
          email,
		  userName
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

/**
 * POST /ruser/register
 */
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Faltan parámetros");
    } else {
      const hash = bcrypt.hashSync(password, saltRounds);
      const user = await User.create({
        fullname,
        email,
        password: hash,
      });
      if (user) {
        return res.status(200).json(user);
      }
      return res.status(404).send("Usuario no creado");
    }
  } catch (error) {
    res.status(400).send(error.message);
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

/**
 * load defaul admin user
 */
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
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = router;
