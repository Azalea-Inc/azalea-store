const CashBox = require("../models/CashBox");
const Turn = require("../models/Turn");
const CashBoxMovement = require("../models/CashBoxMovement");
const CashBoxRepository = require("../data/sequelize/repository/CashBoxRepository");

class CashBoxController {
  constructor() {
    this.repository = new CashBoxRepository();
  }

  async createCashBox(data) {
    const cashBox = CashBox.build(data);
    return await this.repository.createCashBox(cashBox);
  }

  async showCashBoxes() {
    return await this.repository.showCashBoxes();
  }

  async showCashBoxInfo(id) {
    return await this.repository.showCashBoxInfo(id);
  }

  async renameCashBox(id, name) {
    await this.repository.renameCashBox(id, name);
  }

  async removeCashBox(id) {
    await this.repository.removeCashBox(id);
  }

  async showCashBoxTurns(id) {
    return await this.repository.showCashBoxTurns(id);
  }

  async openCashBox(data) {
    const turn = Turn.build(data);
    return await this.repository.openTurn(turn);
  }

  async closeCashBox(id, closeAmount) {
    await this.repository.closeTurn(id, closeAmount);
  }

  async showRegistries() {
    return await this.repository.showTurns();
  }

  async showRegistry(id) {
    return await this.repository.showTurn(id);
  }

  async createMovement(registryId, data) {
    const movement = CashBoxMovement.build({ registryId, ...data });
    return await this.repository.createMovement(registryId, movement);
  }

  async showMovementsByRegistry(turnId) {
    return await this.repository.showMovementsByTurn(turnId);
  }
}

module.exports = CashBoxController;
