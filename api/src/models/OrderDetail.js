const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
	sequelize.define(
		"orderDetail",
		{
			quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            unitPrice: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            }
		},
		{
			timestamps: false,
		}
	)
}