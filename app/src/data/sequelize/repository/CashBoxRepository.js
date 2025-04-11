class CashBoxRepository {
  constructor() {
    this.model = require("../entities/CashBoxEntity");
    this.modelRegistry = require("../entities/CashBoxRegistryEntity");
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

  async openCashBox(cashBoxRegistry) {
    await this.modelRegistry.create(cashBoxRegistry);
  }

  async closeCashBox(id, closeAmount) {
    const cashBoxRegistry = await this.modelRegistry.findByPk(id);
    if (!cashBoxRegistry) throw new Error("Cash box registry not found");

    cashBoxRegistry.closeAmount = closeAmount;
    cashBoxRegistry.closeDate = new Date();
    await cashBoxRegistry.save();
  }

  async showCashBoxRegistries(id) {
    try {
      const cashBox = await this.model.findByPk(id);
      if (!cashBox) throw new Error("Cash box not found");
      return await cashBox.getRegistries();
    } catch (error) {
      throw new Error("Failed to get cash box registry");
    }
  }

  async showRegistries() {
    return await this.modelRegistry.findAll({
      include: "cashBox",
    });
  }
}

module.exports = CashBoxRepository;
