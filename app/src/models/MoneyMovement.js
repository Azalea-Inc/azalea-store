const { randomUUID } = require("crypto");

class MoneyMovement {
  constructor(amount, type) {
    this.amount = amount;
    this.type = type;
    this.date = new Date();
  }

  setTurnId(id) {
    this.turnId = id;
  }

  generateId() {
    this.id = randomUUID();
  }

  static build(data) {
    const { amount, type, registryId } = data;
    const movement = new MoneyMovement(amount, type);
    movement.generateId();
    movement.setTurnId(registryId);
    return movement;
  }
}

module.exports = MoneyMovement;
