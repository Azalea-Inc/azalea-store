const { DataTypes } = require("sequelize");
const SequelizeDB = require("../SequelizeDB");
const sequelize = SequelizeDB.getInstance().sequelize;

const CashBoxMovementEntity = sequelize.define(
  "CashBoxMovement",
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "deposit",
      values: ["deposit", "withdrawal"],
    },
    cashBoxRegistryId: {
      type: DataTypes.UUID,
      references: {
        model: "CashBoxeRegistries",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = CashBoxMovementEntity;
