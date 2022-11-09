const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
	sequelize.define(
		"OrderDetail",
		{
			quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            }
            
		},
		{
			timestamps: false,
		}
	)
}