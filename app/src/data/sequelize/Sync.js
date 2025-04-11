const InventoryEntity = require("./entities/InventoryEntity");
const ProductEntity = require("./entities/ProductEntity");
const CashBoxEntity = require("./entities/CashBoxEntity");
const CashBoxRegistryEntity = require("./entities/CashBoxRegistryEntity");
const SaleEntity = require("./entities/SaleEntity");

module.exports = () => {
  ProductEntity.hasOne(InventoryEntity, {
    foreignKey: "productId",
    as: "inventory",
  });
  InventoryEntity.belongsTo(ProductEntity, {
    foreignKey: "productId",
    as: "product",
  });

  CashBoxEntity.hasMany(CashBoxRegistryEntity, {
    foreignKey: "cashBoxId",
    as: "registries",
  });
  CashBoxRegistryEntity.belongsTo(CashBoxEntity, {
    foreignKey: "cashBoxId",
    as: "cashBox",
  });

  SaleEntity.hasMany(InventoryEntity, {
    foreignKey: "saleId",
    as: "inventories",
  });
  InventoryEntity.belongsTo(SaleEntity, {
    foreignKey: "saleId",
    as: "sale",
  });
};
