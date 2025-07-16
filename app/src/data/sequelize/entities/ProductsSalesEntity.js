const { DataTypes } = require("sequelize");
const SequelizeDB = require("../SequelizeDB");

const sequelize = SequelizeDB.getInstance().sequelize;

const ProductsSalesEntity = sequelize.define(
  "ProductsSales",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sales",
        key: "id",
      },
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = ProductsSalesEntity;
