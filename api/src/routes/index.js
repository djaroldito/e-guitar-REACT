//require('dotenv').config();
const { Router } = require('express');
const router = Router();

const rguitars = require('./rguitars.js')
const rfilters= require('./rfilters.js')
const ruser = require("./ruser")
const payments = require("./payments");

router.use('/rguitars', rguitars)
router.use('/rfilters', rfilters)
router.use("/ruser", ruser)
router.use("/payments", payments)


module.exports = router;
