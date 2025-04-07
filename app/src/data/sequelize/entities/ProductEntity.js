const { DataTypes } = require("sequelize");
const SequelizeDB = require("../SequelizeDB");

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
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = ProductEntity;
