require("dotenv").config()
const { Sequelize, DataTypes } = require("sequelize")
const fs = require("fs")
const path = require("path")
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env
// const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT} = require ('./config.js')
// let sequelize = new Sequelize(
// 	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
// 	{
// 		logging: false, // set to console.log to see the raw SQL queries
// 		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// 	}
// )

const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME } = process.env;

let sequelize =  process.env.NODE_ENV === 'production'
     ?

	new Sequelize(
		`postgresql://postgres:BgLqltAa73qxr7TQbrWj@containers-us-west-108.railway.app:7266/railway`,
		{
			logging: false, // set to console.log to see the raw SQL queries
			native: false, // lets Sequelize know we can use pg-native for ~30% more speed
		}
	):
	 new Sequelize(
		  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
			{
				logging: false, // set to console.log to see the raw SQL queries
				native: false, // lets Sequelize know we can use pg-native for ~30% more speed
			}
		)



const basename = path.basename(__filename)

const modelDefiners = []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)))
	})

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize))
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models)
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
])
sequelize.models = Object.fromEntries(capsEntries)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Product, Order, OrderDetail, Review, Cart, DiscountCode} = sequelize.models

Order.belongsTo(User,{foreignKey : 'userId'})
User.hasMany(Order, { foreignKey: 'userId' })
OrderDetail.belongsTo(Order,{ foreignKey: 'orderId', onDelete: 'cascade' })
Order.hasMany(OrderDetail,{ foreignKey: 'orderId' })
OrderDetail.belongsTo(Product,{ foreignKey: 'productId' })
Product.hasMany(OrderDetail,{ foreignKey: 'productId' })

// reviews
Review.belongsTo(User,{foreignKey: 'userId'});
User.hasMany(Review,{foreignKey : 'userId'});
Review.belongsTo(Product,{foreignKey: 'productId'});
Product.hasMany(Review, { foreignKey: 'productId' });

// cart
Product.belongsToMany(User, { through: Cart })
User.belongsToMany(Product, { through: Cart })

//discount user
DiscountCode.belongsTo(User, { foreignKey: "userId" })
User.hasMany(DiscountCode, { foreignKey: "userId" })

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
}
