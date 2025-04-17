const { randomUUID } = require("crypto");

class CashBoxMovement {
  constructor(amount, type) {
    this.amount = amount;
    this.type = type;
    this.date = new Date();
  }

  setRegistryId(id) {
    this.registryId = id;
  }

  generateId() {
    this.id = randomUUID();
  }

  static build(data) {
    const { amount, type, registryId } = data;
    const movement = new CashBoxMovement(amount, type);
    movement.generateId();
    movement.setRegistryId(registryId);
    return movement;
  }
}

module.exports = CashBoxMovement;
