const CashBox = require("../models/CashBox");
const CashBoxRegistry = require("../models/CashBoxRegistry");
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

  async showCashBoxRegistries(id) {
    return await this.repository.showCashBoxRegistries(id);
  }

  async openCashBox(data) {
    const cashBoxRegistry = CashBoxRegistry.build(data);
    return await this.repository.openCashBox(cashBoxRegistry);
  }

  async closeCashBox(id, closeAmount) {
    await this.repository.closeCashBox(id, closeAmount);
  }

  async showRegistries() {
    return await this.repository.showRegistries();
  }

  async showRegistry(id) {
    return await this.repository.showRegistry(id);
  }

  async createMovement(registryId, data) {
    const movement = CashBoxMovement.build({ registryId, ...data });
    return await this.repository.createMovement(registryId, movement);
  }

  async showMovementsByRegistry(registryId) {
    return await this.repository.showMovementsByRegistry(registryId);
  }
}

module.exports = CashBoxController;
