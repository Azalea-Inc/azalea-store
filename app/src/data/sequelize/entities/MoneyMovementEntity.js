const { DataTypes } = require("sequelize");
const SequelizeDB = require("../SequelizeDB");
const sequelize = SequelizeDB.getInstance().sequelize;

const MoneyMovementEntity = sequelize.define(
  "MoneyMovement",
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
    turnId: {
      type: DataTypes.UUID,
      references: {
        model: "Turns",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = MoneyMovementEntity;
