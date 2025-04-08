const { DataTypes } = require("sequelize");
const SequelizeDB = require("../SequelizeDB");

const sequelize = SequelizeDB.getInstance().sequelize;

const CashBoxEntity = sequelize.define(
  "CashBox",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = CashBoxEntity;
