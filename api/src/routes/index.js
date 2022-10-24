//require('dotenv').config();
const { Router } = require('express');
const router = Router();

const allGuitars = require('./allGuitars.js')

router.use('/', allGuitars)

module.exports = router;
