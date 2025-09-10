class CashBoxRepository {
  constructor() {
    this.model = require("./CashBoxEntity");
  }

  async createCashBox(cashBox) {
    const newCashBox = await this.model.create(cashBox);
    return newCashBox;
  }

  async showCashBoxes() {
    return await this.model.findAll({ order: [["createdAt", "DESC"]] });
  }

  async showCashBoxInfo(id) {
    const cashBox = await this.model.findByPk(id);
    if (!cashBox) throw new Error("Cash box not found");
    return cashBox.toJSON();
  }

  async updateCashBox(id, cashBox) {
    const cashBoxToUpdate = await this.model.findByPk(id);
    if (!cashBoxToUpdate) throw new Error("Cash box not found");
    return await cashBoxToUpdate.update(cashBox);
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

  async showCashBoxTurns(id) {
    const cashBox = await this.model.findByPk(id);
    if (!cashBox) throw new Error("Cash box not found");
    return await cashBox.getRegistries();
  }

  async setClient(id, clientId) {
    const cashBox = await this.model.findByPk(id);

    const turns = await cashBox.getTurns();

    if (!cashBox) throw new Error("Cash box not found");
    cashBox.clientId = clientId;
    return await cashBox.save();
  }
}

module.exports = CashBoxRepository;
