//require('dotenv').config();
const { Router } = require('express');
const router = Router();

const rguitars = require('./rguitars.js')
const rfilters= require('./rfilters.js')
const ruser= require('./ruser.js')


router.use('/rguitars', rguitars)
router.use('/rfilters', rfilters)

router.use('/ruser', ruser)


module.exports = router;
