//require('dotenv').config();
const { Router } = require('express');
const router = Router();

const allGuitars = require('./allGuitars.js')
const allTtypes = require('./allTypes.js')

router.use('/allguitars', allGuitars)
router.use('/allTypes', allTtypes)

module.exports = router;
