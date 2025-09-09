const CashBox = require("$models/CashBox");
const CashBoxRepository = require("./CashBoxRepository");
const { randomUUID } = require("crypto");

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

  async setClient(id, clientId) {
    if (!clientId) clientId = randomUUID();

    return await this.repository.setClient(id, clientId);
  }
}

module.exports = CashBoxController;
