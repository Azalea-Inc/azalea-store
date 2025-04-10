const CashBox = require("../models/CashBox");
const CashBoxRegistry = require("../models/CashBoxRegistry");
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

  async showCashBoxRegistries(id) {
    return await this.repository.showCashBoxRegistries(id);
  }

  async openCashBox(data) {
    const cashBoxRegistry = CashBoxRegistry.build(data);
    await this.repository.openCashBox(cashBoxRegistry);
  }

  async closeCashBox(id, closeAmount) {
    await this.repository.closeCashBox(id, closeAmount);
  }

  async showRegistries() {
    return await this.repository.showRegistries();
  }
}

module.exports = CashBoxController;
