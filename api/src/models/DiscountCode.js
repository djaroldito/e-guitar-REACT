const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DiscountCode", {
    code: {
        type: DataTypes.STRING,
        unique: "codeIndex",
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
