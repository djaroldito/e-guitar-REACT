const axios = require("axios");
const secualize = require("sequelize");
const fs = require("fs");
const path = require("path");

const { Router } = require("express");
const router = Router();

const { Product } = require("../db.js");

router.get("/", async (req, res) => {
  const { brand } = req.query;

  const guitarJson = fs.readFileSync(
    path.join(__dirname, "../../../guitar.json")
  );
  const guitars = JSON.parse(guitarJson);
  const products = guitars.map((guitar) => {
    return {
      brand: guitar.brand,
      model: guitar.model,
      img: guitar.img.join(","),
      color: guitar.color.join(","),
      price: guitar.price,
      strings: guitar.strings,
      description: guitar.description,
      stock: guitar.stock,
      discount: guitar.discount.replace("%", ""),
      type: guitar.type.toLowerCase(),
      leftHand: guitar["left-hand"],
      aditionalInformation: guitar["Additional-information"],
    };
  });

  try {
    let bdGuitar = await Product.findAll();
    if (bdGuitar.length === 0) {
      await Product.bulkCreate(products);
      res.status(200).send("Guitarras cargadas");
    }
  } catch (error) {
    res.status(404).send(error);
  }
  if (brand) {
    const guitar = await Product.findAll({
      where: {
        brand: {
          [secualize.Op.iLike]: `%${brand}%`, // ilike trabaja entre mayusculas y minusculas y de cierta forma te acelera los procesos
        },
      },
    });
    console.log(guitar);
    guitar.length
      ? res.status(200).send(guitar)
      : res.status(404).send("No se encontro guitarra");
  } else {
    let allGuitars = await Product.findAll();
    res.status(200).json(allGuitars);
  }
});

router.get("/:idGuitar", async (req, res) => {
  const { idGuitar } = req.params;
  console.log(idGuitar);
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
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  const {
    brand,
    model,
    img,
    color,
    price,
    strings,
    description,
    stock,
    discount,
    type,
    leftHand,
    aditionalInformation,
    createdAt,
    updatedAt,
    deletedAt,
  } = req.body;
  console.log(brand);
  //compruebo que esten todos los parametros
  if (
    brand &&
    model &&
    img &&
    color &&
    price &&
    strings &&
    description &&
    stock &&
    discount &&
    type &&
    leftHand &&
    aditionalInformation &&
    createdAt &&
    updatedAt
  ) {
    const newGuitar = await Product.create({
      brand,
      model,
      img,
      color,
      price,
      strings,
      description,
      stock,
      discount,
      type,
      leftHand,
      aditionalInformation,
      createdAt,
      updatedAt,
      deletedAt,
    });
    res.status(200).json(newGuitar);
  } else {
    return res.status(400).send("Faltan parametros");
  }
});

module.exports = router;
