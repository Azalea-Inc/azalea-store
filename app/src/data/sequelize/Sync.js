const InventoryEntity = require("./entities/InventoryEntity");
const ProductEntity = require("./entities/ProductEntity");
const CashBoxEntity = require("./entities/CashBoxEntity");
const TurnEntity = require("./entities/TurnEntity");
const MoneyMovementEntity = require("./entities/MoneyMovementEntity");
const SaleEntity = require("./entities/SaleEntity");
const MovementEntity = require("./entities/MovementEntity");
const ProductsSalesEntity = require("./entities/ProductsSalesEntity");

module.exports = () => {
  ProductEntity.hasOne(InventoryEntity, {
    foreignKey: "productId",
    as: "inventory",
    onDelete: "CASCADE",
  });
  InventoryEntity.belongsTo(ProductEntity, {
    foreignKey: "productId",
    as: "product",
  });

  CashBoxEntity.hasMany(TurnEntity, {
    foreignKey: "cashBoxId",
    as: "turns",
    onDelete: "CASCADE",
  });

  TurnEntity.belongsTo(CashBoxEntity, {
    foreignKey: "cashBoxId",
    as: "cashBox",
  });

  TurnEntity.hasOne(SaleEntity, {
    foreignKey: "turnId",
    as: "sale",
    onDelete: "CASCADE",
  });

  SaleEntity.belongsTo(TurnEntity, {
    foreignKey: "turnId",
    as: "turn",
  });

  SaleEntity.belongsToMany(ProductEntity, {
    through: ProductsSalesEntity,
    foreignKey: "productId",
    as: "product",
  });

  ProductEntity.belongsToMany(SaleEntity, {
    through: ProductsSalesEntity,
    foreignKey: "saleId",
    as: "sale",
  });

  TurnEntity.hasMany(MoneyMovementEntity, {
    foreignKey: "turnId",
    as: "movements",
    onDelete: "CASCADE",
  });

  MoneyMovementEntity.belongsTo(TurnEntity, {
    foreignKey: "turnId",
    as: "turn",
  });

  InventoryEntity.hasMany(MovementEntity, {
    foreignKey: "inventoryId",
    as: "movements",
    onDelete: "CASCADE",
  });

  MovementEntity.belongsTo(InventoryEntity, {
    foreignKey: "inventoryId",
    as: "inventory",
  });
};
