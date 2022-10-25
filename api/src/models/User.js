const { DataTypes } = require("sequelize")
module.exports = (sequelize) => {
	sequelize.define(
		"user",
		{
			username: DataTypes.STRING,
			fullname: DataTypes.STRING,
			email: {
                type: DataTypes.STRING,
                unique: 'userEmailIndex',
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