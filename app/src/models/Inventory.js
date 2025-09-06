const { randomUUID } = require("crypto");

class Inventory {
  constructor(productId, costPrice, stock) {
    this.productId = productId;
    this.costPrice = costPrice;
    this.stock = stock;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  generateId() {
    this.id = randomUUID();
  }

  static build(data) {
    const { productId, salePrice, stock } = data;
    const inventory = new Inventory(productId, salePrice, stock);
    inventory.activate();
    inventory.generateId();
    return inventory;
  }
}

module.exports = Inventory;
