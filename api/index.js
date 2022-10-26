const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// load guitarJson to database
const fs = require('fs')
const path = require('path')
const { Product } = require('../api/src/db')
/* const loadGuitarJson = async () => {
    const guitarJson = fs.readFileSync(path.join(__dirname, '../guitar.json'))
    const guitars = JSON.parse(guitarJson);
    const products = guitars.map((guitar) => {
        return {
            id: guitar.id,
            brand: guitar.brand,
            model: guitar.model,
            img: guitar.img.join(','),
            color: guitar.color.join(','),
            price: guitar.price,
            strings: guitar.strings,
            description: guitar.description,
            stock: guitar.stock,
            discount: guitar.discount.replace("%", ""),
            type: guitar.type.toLowerCase(),
            leftHand: guitar['left-hand'],
            aditionalInformation: guitar['Additional-information']

        }
    })
    const inserted = await Product.bulkCreate(products)
	return (inserted) ? inserted.length : 'No se insertaron productos'
} */

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
    server.listen(3001, function () {
   /*  loadGuitarJson().then( res => console.log('Productos insertados: ',res)) */
    console.log('escuchando en puerto 3001'); // eslint-disable-line no-console
  });
});