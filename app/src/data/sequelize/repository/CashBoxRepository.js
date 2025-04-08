class CashBoxRepository {
  constructor() {
    this.model = require("../entities/CashBoxEntity");
  }

  async createCashBox(name, location) {
    try {
      const cashBox = await this.model.create({ name, location });
      return cashBox;
    } catch (error) {
      throw new Error("Failed to create cash box");
    }
  }

  async getCashBoxById(id) {
    try {
      const cashBox = await this.model.findByPk(id);
      return cashBox;
    } catch (error) {
      throw new Error("Failed to get cash box");
    }
  }
}

module.exports = CashBoxRepository;
