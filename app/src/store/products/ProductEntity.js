const { DataTypes } = require("sequelize");
const SequelizeDB = require("$data/sequelize/SequelizeDB");

const sequelize = SequelizeDB.getInstance().sequelize;

const ProductEntity = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salePrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  minStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  productType: DataTypes.ENUM("unit", "bulk", "kit"),
  unitOfMeasure: {
    type: DataTypes.ENUM("piece", "kg", "l", "m", "cm", "mm"),
    allowNull: true,
    defaultValue: "piece",
  },
});

module.exports = ProductEntity;
