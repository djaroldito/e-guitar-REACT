const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
sequelize.define(
	"Cart",
    {
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    },{
        timestamps: false,
    }
    )
}