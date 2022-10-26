const axios = require ('axios')
require ('dotenv').config()

const {Router} = require('express')

const router =  Router()
const { Product } = require("../db.js");

router.get('/brands',async (req, res) => {
    try {
     let allGuitars = await Product.findAll()

     let tempBrands = allGuitars.map(el => el.brand ? el.brand : null).map(el => el && el.split(', '));
     let brands = [...new Set(tempBrands.flat())];
      
     res.status(200).json(brands)
    } catch (error) {
        res.status(404).send(error)
    }

})

router.get('/types', async (req, res) => {
    try {
        let allGuitars = await Product.findAll()
   
        let tempType = allGuitars.map(el => el.type ? el.type : null).map(el => el && el.split(', '));
        let Type = [...new Set(tempType.flat())];
         
        res.status(200).json(Type)
       } catch (error) {
           res.status(404).send(error)
       }
})

router.get('/colors',async (req, res) => {
    try {
        let allGuitars = await Product.findAll()
   
        let tempColors = allGuitars.map(el => el.color ? el.color : null).map(el => el && el.split(', '));
        let colors = [...new Set(tempColors.flat())];
         
        res.status(200).json(colors)
       } catch (error) {
           res.status(404).send(error)
       }
})    

router.get('/models',async (req, res) => {
    try {
        let allGuitars = await Product.findAll()
   
        let tempModels = allGuitars.map(el => el.model ? el.model : null).map(el => el && el.split(', '));
        let models = [...new Set(tempModels.flat())];
         
        res.status(200).json(models)
       } catch (error) {
           res.status(404).send(error)
       }
}) 



module.exports = router