const axios = require('axios');
const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
res.send('aca van todos los tipos')
})

module.exports = router;