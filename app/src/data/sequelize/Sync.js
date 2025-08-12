const InventoryEntity = require("$store/inventory/InventoryEntity");
const ProductEntity = require("$store/products/ProductEntity");
const CashBoxEntity = require("$store/boxes/CashBoxEntity");
const TurnEntity = require("$store/boxes/TurnEntity");
const MoneyMovementEntity = require("$store/sales/MoneyMovementEntity");
const SaleEntity = require("$store/sales/SaleEntity");
const ProductsSalesEntity = require("$store/sales/ProductsSalesEntity");
const MovementEntity = require("$store/inventory/MovementEntity");
const UserEntity = require("$store/users/UserEntity");

module.exports = () => {
  UserEntity.hasMany(TurnEntity, {
    foreignKey: "userId",
    as: "turns",
    onDelete: "CASCADE",
  });

  TurnEntity.belongsTo(UserEntity, {
    foreignKey: "userId",
    as: "user",
  });

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
