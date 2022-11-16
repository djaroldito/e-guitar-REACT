const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
	sequelize.define(
		"order",
		{
			orderDate: DataTypes.DATEONLY,
			orderStatus: {
				type: DataTypes.ENUM,
				values: ['PAYMENT COMPLETED','AWAITING PAYMENT','CLOSED','CANCELED'],
			},
			deliveryStatus: {
				type: DataTypes.ENUM,
				values: ['PENDING','DELIVERED','CANCELED'],
			},
            aditionalDetails: DataTypes.STRING,
            total: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },
			code: {
				type: DataTypes.STRING,
			},
			paymentLink: {
				type: DataTypes.STRING
			}
		}
	)
}