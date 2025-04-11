const { randomUUID } = require("crypto");

class Sale {
  constructor(cashBoxRegistryId) {
    this.date = new Date();
    this.cashBoxRegistryId = cashBoxRegistryId;
  }

  generateId() {
    this.id = randomUUID();
  }

  static build(data) {
    const { cashBoxRegistryId } = data;
    const sale = new Sale(cashBoxRegistryId);
    sale.generateId();
    return sale;
  }
}

module.exports = Sale;
