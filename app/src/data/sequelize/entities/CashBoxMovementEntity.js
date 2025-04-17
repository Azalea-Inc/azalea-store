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
      defaultValue: "entry",
      values: ["open_register", "entry", "exit", "other"],
    },
    registryId: {
      type: DataTypes.UUID,
      references: {
        model: "CashBoxRegistries",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = CashBoxMovementEntity;
