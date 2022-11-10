const { DataTypes } = require("sequelize")
module.exports = (sequelize) => {
	sequelize.define(
		"review",
		{
			message: DataTypes.TEXT,
            stars: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 1,
                    max: 5,
                }
            }
		}
	)
}