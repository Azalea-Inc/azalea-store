const { randomUUID } = require("crypto");

class Turn {
  constructor(openAmount, cashBoxId) {
    if (!openAmount || !cashBoxId) throw new Error("Invalid parameters");

    this.openAmount = openAmount;
    this.cashBoxId = cashBoxId;
    this.openDate = new Date();
  }

  generateId() {
    this.id = randomUUID();
  }

  close(closeAmount) {
    this.closeAmount = closeAmount;
  }

  static build(data) {
    const { openAmount, cashBoxId } = data;
    const turn = new Turn(openAmount, cashBoxId);
    turn.generateId();
    return turn;
  }
}

module.exports = Turn;
