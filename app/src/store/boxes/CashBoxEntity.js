const { DataTypes } = require("sequelize");
const SequelizeDB = require("$data/sequelize/SequelizeDB");

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
    clientId: {
      type: DataTypes.UUID,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = CashBoxEntity;
