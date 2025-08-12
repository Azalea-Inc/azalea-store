const { DataTypes } = require("sequelize");
const SequelizeDB = require("$data/sequelize/SequelizeDB");

const sequelize = SequelizeDB.getInstance().sequelize;

const MovementEntity = sequelize.define(
  "Movement",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("INPUT", "OUTPUT"),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    inventoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Inventories",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = MovementEntity;
