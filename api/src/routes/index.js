//require('dotenv').config();
const { Router } = require('express');
const router = Router();

const allGuitars = require('./allGuitars.js')
const allTtypes = require('./allTypes.js')
const allBrands = require('./allBrands.js')

router.use('/allguitars', allGuitars)
router.use('/allTypes', allTtypes)
router.use('/allBrands', allBrands)

module.exports = router;
