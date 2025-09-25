const { DataTypes } = require("sequelize");
const SequelizeDB = require("$data/sequelize/SequelizeDB");

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
  status: {
    type: DataTypes.ENUM("OPENED", "COMPLETED", "CANCELLED"),
    allowNull: false,
    defaultValue: "OPENED",
  },
  turnId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Turns",
      key: "id",
    },
  },
});

module.exports = SaleEntity;
