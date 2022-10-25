const { DataTypes } = require("sequelize")
module.exports = (sequelize) => {
	sequelize.define(
		"customer",
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
                unique: 'emailIndex',
                validate: {
                    isEmail: true,
                }

			},
			password: {
                type: DataTypes.STRING,
                allowNull:false
			}
		}
	)
}