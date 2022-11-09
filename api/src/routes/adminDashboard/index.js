const { Router } = require('express');
const router = Router();

// ADMIN DASHBOARD
const product = require("./product.js");
const user = require("./user.js");

router.use("/product", product)
router.use("/user", user)

module.exports = router;