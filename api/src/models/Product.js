const { DataTypes } = require("sequelize")
module.exports = (sequelize) => {
	sequelize.define(
		"product",
		{
			brand: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			model: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			img: DataTypes.TEXT,
			color: DataTypes.STRING,
			price: {
				type: DataTypes.FLOAT,
				defaultValue: 0,
			},
			strings: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			description: DataTypes.TEXT,
			stock: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			discount: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			type: {
				type: DataTypes.ENUM,
                values: ['acustica', 'criolla', 'electrica','electro-acustica']
            },
            leftHand: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
			aditionalInformation: DataTypes.TEXT,
		},
		{
			paranoid: true,
		}
	)
}
