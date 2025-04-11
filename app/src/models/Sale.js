const { randomUUID } = require("crypto");

class Sale {
  constructor() {
    this.date = new Date();
  }

  generateId() {
    this.id = randomUUID();
  }

  static build() {
    const sale = new Sale();
    sale.generateId();
    return sale;
  }
}

module.exports = Sale;
