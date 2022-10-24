const axios = require("axios");

const { Router } = require("express");
const router = Router();

router.get('/',(req,res)=>{
    res.send('estoy en home = /')
})

router.get('*',(req,res)=>{
    res.status(404).send('no existe la ruta')
})

module.exports = router;