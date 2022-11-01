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
     const final = brands.filter(el => el !== null)
      
     res.status(200).json(final)
    } catch (error) {
        res.status(404).send(error)
    }

})

router.get('/types', async (req, res) => {
    try {
        let allGuitars = await Product.findAll()
   
        let tempType = allGuitars.map(el => el.type ? el.type : null).map(el => el && el.split(', '));
        let Type = [...new Set(tempType.flat())];
        const final = Type.filter(el => el !== null)
         
        res.status(200).json(final)
       } catch (error) {
           res.status(404).send(error)
       }
})

router.get('/colors',async (req, res) => {
    try {
        let allGuitars = await Product.findAll()
   
        let tempColors = allGuitars.map(el => el.color ? el.color : null).map(el => el && el.split(', '));
        let colors = [...new Set(tempColors.flat())];
        const final = colors.filter(el => el !== null)
         
        res.status(200).json(final)
       } catch (error) {
           res.status(404).send(error)
       }
})    


router.get('/models',async (req, res) => {
    try {
        let allGuitars = await Product.findAll()
   
        let tempModels = allGuitars.map(el => el.model ? el.model : null).map(el => el && el.split(', '));
        let models = [...new Set(tempModels.flat())];
        const final = models.filter(el => el !== null)
         
        res.status(200).json(final)
       } catch (error) {
           res.status(404).send(error)
       }
}) 



module.exports = router