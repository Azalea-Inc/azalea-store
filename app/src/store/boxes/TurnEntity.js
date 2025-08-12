const { DataTypes } = require("sequelize");
const SequelizeDB = require("$data/sequelize/SequelizeDB");
const sequelize = SequelizeDB.getInstance().sequelize;

const TurnEntity = sequelize.define(
  "Turn",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
        model: "CashBoxes",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = TurnEntity;
