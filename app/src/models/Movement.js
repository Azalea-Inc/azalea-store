const { randomUUID } = require("crypto");

class Movement {
  constructor(amount, type, inventoryId) {
    this.amount = amount;
    this.type = type;
    this.date = new Date();
    this.inventoryId = inventoryId;
  }

  generateId() {
    this.id = randomUUID();
  }

  static build(data) {
    const { amount, type, inventoryId } = data;
    if (!inventoryId) {
      throw new Error("InventoryId Requiered.");
    }
    const movement = new Movement(amount, type, inventoryId);
    movement.generateId();
    return movement;
  }
}

module.exports = Movement;
