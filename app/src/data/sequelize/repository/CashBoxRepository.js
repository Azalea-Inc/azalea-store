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

  async getCashBoxById(id) {
    try {
      const cashBox = await this.model.findByPk(id);
      return cashBox;
    } catch (error) {
      throw new Error("Failed to get cash box");
    }
  }

  async openCashBox(cashBoxRegistry) {
    await this.modelRegistry.create(cashBoxRegistry);
  }

  async closeCashBox(id) {
    try {
      const cashBox = await this.model.findByPk(id);
      if (!cashBox) throw new Error("Cash box not found");
      cashBox.closeDate = new Date();
      await cashBox.save();
      return cashBox;
    } catch (error) {
      throw new Error("Failed to close cash box");
    }
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
