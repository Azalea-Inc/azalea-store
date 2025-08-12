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
    salePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
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
      defaultValue: false,
    },
    // lowStockThreshold: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   defaultValue: 10,
    // },
    // lastRestockDate: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
  },
  {
    timestamps: true,
  },
);

module.exports = InventoryEntity;
