const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
sequelize.define(
	"cart",
    {
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        color: {
            type: DataTypes.STRING,

        }
    },{
        timestamps: false,
    }
    )
}