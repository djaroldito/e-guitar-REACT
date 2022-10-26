const axios = require("axios");
const secualize = require("sequelize");

const { Router } = require("express");
const router = Router();

const { Product } = require("../db.js");

router.get('/',async (req,res)=>{
    
    const {brand} = req.query;

    try {
        if(brand){
            const guitar = await Product.findAll({  
                where: {
                  brand: {
                    [secualize.Op.iLike]: `%${brand}%`, // ilike trabaja entre mayusculas y minusculas y de cierta forma te acelera los procesos
                  },
                },
              });
              console.log(guitar)
              guitar.length
              ? res.status(200).send(guitar)
              : res.status(404).send("No se encontro guitarra");
        }
        else{
        let allGuitars = await Product.findAll()
        res.status(200).json(allGuitars)
    }
    } catch (error) {
        res.status(404).send(error)
        
    } 
    
})

router.get("/:idGuitar", async (req, res) => {
    const { idGuitar } = req.params;
    console.log(idGuitar)
    try {
      //Traigo el pais por parametro
      const guitar = await Product.findOne({
        where: {
          id: idGuitar.toUpperCase(),
        },
      });
      console.log(guitar);
      if (guitar) {
        //si encuentra el pais
        return res.status(200).json(guitar);
      } else {
        return res.status(404).send("Guitarra no encontrada");
      }
    } catch (error) {
      res.status(404).send(error)
    }
  });



module.exports = router;