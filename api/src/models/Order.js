const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
	sequelize.define(
		"order",
		{
			orderDate: DataTypes.DATEONLY,
			orderStatus: {
				type: DataTypes.ENUM,
				values: ['OPEN','CLOSED','CANCELED'],
			},
			deliveryStatus: {
				type: DataTypes.ENUM,
				values: ['PENDING','DELIVERED','CANCELED'],
			},
            aditionalDetails: DataTypes.STRING,
            total: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            }
		}
	)
}