const { DataTypes } = require("sequelize")
module.exports = (sequelize) => {
	sequelize.define(
		"user",
		{
			fullname: DataTypes.STRING,
			avatar: DataTypes.STRING,
			address: DataTypes.STRING,
			province: DataTypes.STRING,
			city: DataTypes.STRING,
			zipcode: DataTypes.STRING,
			phone: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: "emailIndex",
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			paranoid: true,
		}
	)
}
