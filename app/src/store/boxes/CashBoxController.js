const CashBox = require("$models/CashBox");
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
}

module.exports = CashBoxController;
