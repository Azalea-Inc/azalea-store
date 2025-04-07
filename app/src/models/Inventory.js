const { randomUUID } = require("crypto");

class Inventory {
  constructor(productId, price, stock) {
    this.productId = productId;
    this.price = price;
    this.stock = stock;
  }

  generateId() {
    this.id = randomUUID();
  }

  static build(data) {
    const { productId, price, stock } = data;
    const inventory = new Inventory(productId, price, stock);
    inventory.generateId();
    return inventory;
  }
}

module.exports = Inventory;
