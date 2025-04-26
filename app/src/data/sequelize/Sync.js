const InventoryEntity = require("./entities/InventoryEntity");
const ProductEntity = require("./entities/ProductEntity");
const CashBoxEntity = require("./entities/CashBoxEntity");
const CashBoxRegistryEntity = require("./entities/CashBoxRegistryEntity");
const CashBoxMovementEntity = require("./entities/CashBoxMovementEntity");
const SaleEntity = require("./entities/SaleEntity");
const MovementEntity = require("./entities/MovementEntity");

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

  CashBoxEntity.hasMany(CashBoxRegistryEntity, {
    foreignKey: "cashBoxId",
    as: "registries",
    onDelete: "CASCADE",
  });
  CashBoxRegistryEntity.belongsTo(CashBoxEntity, {
    foreignKey: "cashBoxId",
    as: "cashBox",
  });

  CashBoxRegistryEntity.hasOne(SaleEntity, {
    foreignKey: "cashBoxRegistryId",
    as: "sale",
    onDelete: "CASCADE",
  });

  // SaleEntity.hasMany(InventoryEntity, {
  //   foreignKey: "saleId",
  //   as: "inventories",
  // });

  SaleEntity.belongsTo(CashBoxRegistryEntity, {
    foreignKey: "cashBoxRegistryId",
    as: "registry",
  });

  // InventoryEntity.belongsTo(SaleEntity, {
  //   foreignKey: "saleId",
  //   as: "sale",
  // });
  //

  CashBoxRegistryEntity.hasMany(CashBoxMovementEntity, {
    foreignKey: "registryId",
    as: "movements",
    onDelete: "CASCADE",
  });

  CashBoxMovementEntity.belongsTo(CashBoxRegistryEntity, {
    foreignKey: "registryId",
    as: "registry",
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
