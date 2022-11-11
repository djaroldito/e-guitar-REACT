const { Router } = require('express');
const router = Router();

// ADMIN DASHBOARD
const product = require("./product.js");
const user = require("./user.js");
const order = require("./order.js");
const review = require("./review.js");

router.use("/product", product)
router.use("/user", user)
router.use("/order", order)
router.use("/review", review)

module.exports = router;