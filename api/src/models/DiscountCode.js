const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DiscountCode", {
    code: {
      type: DataTypes.STRING,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
