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

  async openCashBox(data) {
    const cashBoxRegistry = CashBoxRegistry.build(data);
    await this.repository.openCashBox(cashBoxRegistry);
  }

  async showRegistries() {
    return await this.repository.showRegistries();
  }
}

module.exports = CashBoxController;
