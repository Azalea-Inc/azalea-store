const { REAL } = require("sequelize");

class CashBoxRepository {
  constructor() {
    this.model = require("../entities/CashBoxEntity");
    this.modelRegistry = require("../entities/CashBoxRegistryEntity");
    this.modelMovement = require("../entities/CashBoxMovementEntity");
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
    return await this.modelRegistry.create(cashBoxRegistry);
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
    try {
      return await this.modelRegistry.findAll({
        include: "cashBox",
      });
    } catch (error) {
      throw new Error("Failed to get registries");
    }
  }

  async showRegistry(id) {
    try {
      const registry = await this.modelRegistry.findByPk(id, {
        include: "cashBox",
      });
      if (!registry) throw new Error("Registry not found");
      return registry;
    } catch (error) {
      throw new Error("Failed to get registry");
    }
  }

  async createMovement(id, movement) {
    try {
      const registry = await this.modelRegistry.findByPk(id);
      if (!registry) throw new Error("Cash box not found");
      return await registry.createMovement(movement);
    } catch (error) {
      throw new Error("Failed to create movement");
    }
  }

  async showMovementsByRegistry(id) {
    try {
      const registry = await this.modelRegistry.findByPk(id);
      if (!registry) throw new Error("Registry not found");
      return await registry.getMovements();
    } catch (error) {
      throw new Error("Failed to get movements");
    }
  }
}

module.exports = CashBoxRepository;
