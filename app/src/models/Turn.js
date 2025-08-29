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

  setUserId(userId) {
    this.userId = userId;
  }

  static build(data) {
    const { openAmount, cashBoxId, userId } = data;
    if (!userId) throw new Error("UserId es requerido");

    const turn = new Turn(openAmount, cashBoxId);
    turn.setUserId(userId);
    turn.generateId();
    return turn;
  }
}

module.exports = Turn;
