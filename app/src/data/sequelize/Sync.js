const InventoryEntity = require("./entities/InventoryEntity");
const ProductEntity = require("./entities/ProductEntity");
const CashBoxEntity = require("./entities/CashBoxEntity");
const CashBoxRegistryEntity = require("./entities/CashBoxRegistryEntity");

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
};
