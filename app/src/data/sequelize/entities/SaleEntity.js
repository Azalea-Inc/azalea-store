const { DataTypes } = require("sequelize");
const SequelizeDB = require("../SequelizeDB");

const sequelize = SequelizeDB.getInstance().sequelize;

const SaleEntity = sequelize.define("Sale", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
    validate: {
      min: 0,
    },
  },
  cashBoxRegistryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "CashBoxRegistries",
      key: "id",
    },
  },
});

module.exports = SaleEntity;
