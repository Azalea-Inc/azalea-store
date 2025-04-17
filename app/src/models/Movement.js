const { randomUUID } = require("crypto");

class Movement {
  constructor(amout, type, userId, inventoryId) {
    this.amout = amout;
    this.type = type;
    this.userId = userId;
    this.inventoryId = inventoryId;
  }

  generateId() {
    this.id = randomUUID();
  }

  static build(data) {
    const { amout, type, userId, inventoryId } = data;
    if (!userId) {
      throw new Error("UserID Requiered.");
    }
    const movement = new Movement(amout, type, userId, inventoryId);

    movement.generateId();
    return movement;
  }
}

module.exports = Movement;
