const InventoryEntity = require("./entities/InventoryEntity");
const ProductEntity = require("./entities/ProductEntity");

module.exports = () => {
  ProductEntity.hasOne(InventoryEntity, {
    foreignKey: "productId",
    as: "inventory",
  });
  InventoryEntity.belongsTo(ProductEntity, {
    foreignKey: "productId",
    as: "product",
  });
};
