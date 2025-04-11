const SaleEntity = require("../entities/SaleEntity");

class SaleRepository {
  constructor() {
    this.model = SaleEntity;
  }

  async addSale(sale) {
    try {
      const createdSale = await this.model.create(sale);
      return createdSale;
    } catch (error) {
      throw new Error(`Error creating sale: ${error.message}`);
    }
  }
}

module.exports = SaleRepository;
