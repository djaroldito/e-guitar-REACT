//require('dotenv').config();
const { Router } = require('express');
const router = Router();

const rguitars = require('./rguitars.js')
const rfilters= require('./rfilters.js')
const ruser = require("./ruser")
const payments = require("./payments");
const cart = require("./cart");
const order = require("./order.js");

router.use('/rguitars', rguitars)
router.use('/rfilters', rfilters)
router.use("/ruser", ruser)
router.use("/payments", payments)
router.use("/cart", cart);
router.use("/order", order);


module.exports = router;
