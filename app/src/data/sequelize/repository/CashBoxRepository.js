const { REAL } = require("sequelize");

class CashBoxRepository {
  constructor() {
    this.model = require("../entities/CashBoxEntity");
    this.modelTurn = require("../entities/TurnEntity");
    this.modelMovement = require("../entities/MoneyMovementEntity");
  }

  async createCashBox(cashBox) {
    try {
      const newCashBox = await this.model.create(cashBox);
      return newCashBox;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create cash box");
    }
  }

  async showCashBoxes() {
    return await this.model.findAll();
  }

  async showCashBoxInfo(id) {
    const cashBox = await this.model.findByPk(id);
    if (!cashBox) throw new Error("Cash box not found");
    return cashBox;
  }

  async updateCashBox(id, cashBox) {
    const cashBoxToUpdate = await this.model.findByPk(id);
    if (!cashBoxToUpdate) throw new Error("Cash box not found");
    return await cashBoxToUpdate.update(cashBox);
  }

  async renameCashBox(id, name) {
    const cashBox = await this.model.findByPk(id);
    if (!cashBox) throw new Error("Cash box not found");
    if (!name) throw new Error("Name is required");
    cashBox.name = name;
    await cashBox.save();
  }

  async getCashBoxById(id) {
    try {
      const cashBox = await this.model.findByPk(id);
      return cashBox;
    } catch (error) {
      throw new Error("Failed to get cash box");
    }
  }

  async removeCashBox(id) {
    const cashBox = await this.model.findByPk(id);
    if (!cashBox) throw new Error("Cash box not found");
    await cashBox.destroy();
  }

  async openTurn(turn) {
    const cashBox = await this.model.findByPk(turn.cashBoxId);
    if (!cashBox) throw new Error("Cash box not found");

    const openTurn = await this.modelTurn.findOne({
      where: {
        cashBoxId: turn.cashBoxId,
        isOpen: true,
      },
    });

    if (openTurn) {
      throw new Error("There is already an open turn for this cash box");
    }

    return await this.modelTurn.create(turn);
  }

  async closeTurn(id, closeAmount) {
    const openTurn = await this.modelTurn.findByPk(id);
    if (!openTurn) throw new Error("Open turn not found");

    if (openTurn.isOpen !== true) {
      throw new Error("Turn already closed");
    }

    openTurn.closeAmount = closeAmount;
    openTurn.isOpen = false;
    openTurn.closeDate = new Date();
    await openTurn.save();
  }

  async showCashBoxTurns(id) {
    try {
      const cashBox = await this.model.findByPk(id);
      if (!cashBox) throw new Error("Cash box not found");
      return await cashBox.getRegistries();
    } catch (error) {
      throw new Error("Failed to get cash box turns");
    }
  }

  async showTurns() {
    try {
      return await this.modelTurn.findAll({
        include: "cashBox",
      });
    } catch (error) {
      throw new Error("Failed to get turns");
    }
  }

  async showTurn(id) {
    try {
      const turn = await this.modelTurn.findByPk(id, {
        include: "cashBox",
      });
      if (!turn) throw new Error("Turn not found");
      return turn;
    } catch (error) {
      throw new Error("Failed to get turn");
    }
  }

  async createMovement(id, movement) {
    try {
      const turn = await this.modelTurn.findByPk(id);
      if (!turn) throw new Error("Turn not found");
      return await turn.createMovement(movement);
    } catch (error) {
      throw new Error("Failed to create movement");
    }
  }

  async showMovementsByTurn(id) {
    try {
      const turn = await this.modelTurn.findByPk(id);
      if (!turn) throw new Error("Turn not found");
      return await turn.getMovements();
    } catch (error) {
      throw new Error("Failed to get movements");
    }
  }
}

module.exports = CashBoxRepository;
