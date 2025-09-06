const { DataTypes } = require("sequelize");
const SequelizeDB = require("$data/sequelize/SequelizeDB");

const sequelize = SequelizeDB.getInstance().sequelize;

const InventoryEntity = sequelize.define(
  "Inventory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    costPrice: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    stock: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    productId: {
      type: DataTypes.UUID,
      references: {
        model: "Products",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = InventoryEntity;
