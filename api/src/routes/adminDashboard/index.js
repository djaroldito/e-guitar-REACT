const { Router } = require('express');
const router = Router();

// ADMIN DASHBOARD
const product = require("./product.js");

router.use("/product", product)

module.exports = router;