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

  async showSale(id) {
    try {
      const sale = await this.model.findByPk(id);
      if (!sale) throw new Error(`Sale with id ${id} not found`);
      return sale;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = SaleRepository;
