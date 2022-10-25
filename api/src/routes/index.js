//require('dotenv').config();
const { Router } = require('express');
const router = Router();

const rguitars = require('./rguitars.js')
const  rfilters= require('./rfilters.js')


router.use('/rguitars', rguitars)
router.use('/rfilters', rfilters)


module.exports = router;
