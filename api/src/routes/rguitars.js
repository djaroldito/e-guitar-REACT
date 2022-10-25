const axios = require("axios");

const { Router } = require("express");
const router = Router();

const { Product } = require("../db.js");

router.get('/',async (req,res)=>{
    try {
        let allGuitars = await Product.findAll()
        res.status(200).json(allGuitars)
          
    } catch (error) {
        res.status(404).send(error)
        
    } 
    
})



module.exports = router;