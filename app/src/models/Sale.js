const { randomUUID } = require("crypto");

class Sale {
  constructor(turnId) {
    this.date = new Date();
    this.turnId = turnId;
  }

  generateId() {
    this.id = randomUUID();
  }

  static build(data) {
    const { turnId } = data;
    const sale = new Sale(turnId);
    sale.generateId();
    return sale;
  }
}

module.exports = Sale;
