const { DataTypes } = require("sequelize");
const SequelizeDB = require("../SequelizeDB");
const sequelize = SequelizeDB.getInstance().sequelize;

const CashBoxRegistryEntity = sequelize.define(
  "CashBoxRegistry",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    openDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    closeDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    openAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    closeAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    cashBoxId: {
      type: DataTypes.UUID,
      references: {
        model: "CashBox",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = CashBoxRegistryEntity;
