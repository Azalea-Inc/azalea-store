const { randomUUID } = require("crypto");

class Movement {
  constructor(amout, type, inventoryId) {
    this.amout = amout;
    this.type = type;
    this.date = new Date();
    this.inventoryId = inventoryId;
  }

  generateId() {
    this.id = randomUUID();
  }

  static build(data) {
    const { amout, type, inventoryId } = data;
    if (!inventoryId) {
      throw new Error("InventoryId Requiered.");
    }
    const movement = new Movement(amout, type, inventoryId);
    movement.generateId();
    return movement;
  }
}

module.exports = Movement;
