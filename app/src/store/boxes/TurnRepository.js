const CashBoxEntity = require("./CashBoxEntity");

class TurnRepository {
  constructor() {
    this.model = require("./TurnEntity");
    this.boxModel = require("./CashBoxEntity");
  }

  async openTurn(turn) {
    const cashBox = await this.boxModel.findByPk(turn.cashBoxId);
    if (!cashBox) throw new Error("Cash box not found");

    const openTurn = await this.model.findOne({
      where: {
        cashBoxId: turn.cashBoxId,
        isOpen: true,
      },
    });

    if (openTurn) {
      throw new Error("There is already an open turn for this cash box");
    }

    const newTurn = await this.model.create(turn);
    return newTurn.toJSON();
  }

  async getOpenTurnByClientId(clientId) {
    const box = await this.getBoxByClientId(clientId);
    if (!box) return;

    const openTurn = await this.model.findOne({
      where: {
        cashBoxId: box.id,
        isOpen: true,
      },
    });

    if (!openTurn) return;

    return openTurn.toJSON();
  }

  async closeTurn(id, closeAmount) {
    const openTurn = await this.model.findByPk(id);
    if (!openTurn) throw new Error("Open turn not found");

    if (openTurn.isOpen !== true) {
      throw new Error("Turn already closed");
    }

    openTurn.closeAmount = closeAmount;
    openTurn.isOpen = false;
    openTurn.closeDate = new Date();
    await openTurn.save();
  }

  async showTurns() {
    const turns = await this.model.findAll({
      include: "cashBox",
    });

    return turns.map((turn) => turn.toJSON());
  }

  async showTurn(id) {
    const turn = await this.model.findByPk(id, {
      include: "cashBox",
    });

    if (!turn) return;

    return turn.toJSON();
  }

  async createMovement(id, movement) {
    try {
      const turn = await this.model.findByPk(id);
      if (!turn) throw new Error("Turn not found");
      return await turn.createMovement(movement);
    } catch (error) {
      throw new Error("Failed to create movement");
    }
  }

  async showMovementsByTurn(id) {
    try {
      const turn = await this.model.findByPk(id);
      if (!turn) throw new Error("Turn not found");
      return await turn.getMovements();
    } catch (error) {
      throw new Error("Failed to get movements");
    }
  }

  async getBoxByClientId(clientId) {
    const box = await CashBoxEntity.findOne({
      where: { clientId },
    });

    if (!box) return;

    return box.toJSON();
  }
}

module.exports = TurnRepository;
