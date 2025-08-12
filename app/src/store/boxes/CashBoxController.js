const CashBox = require("$models/CashBox");
const Turn = require("$models/Turn");
const MoneyMovement = require("$models/MoneyMovement");
const CashBoxRepository = require("./CashBoxRepository");

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

  async updateCashBox(id, cashBox) {
    return await this.repository.updateCashBox(id, cashBox);
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

  async openTurn(data) {
    const turn = Turn.build(data);
    return await this.repository.openTurn(turn);
  }

  async closeTurn(id, closeAmount) {
    await this.repository.closeTurn(id, closeAmount);
  }

  async showTurns() {
    return await this.repository.showTurns();
  }

  async showTurn(id) {
    return await this.repository.showTurn(id);
  }

  async createMovement(registryId, data) {
    const movement = MoneyMovement.build({ registryId, ...data });
    return await this.repository.createMovement(registryId, movement);
  }

  async showMovementsByTurn(turnId) {
    return await this.repository.showMovementsByTurn(turnId);
  }
}

module.exports = CashBoxController;
