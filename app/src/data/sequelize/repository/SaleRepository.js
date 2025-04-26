const CashBoxRegistryEntity = require("../entities/CashBoxRegistryEntity");
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

  async showSales(id) {
    try {
      const sales = await this.model.findAll({
        where: { CashBoxRegistryId: id },
      });
      return sales;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async removeSale(id) {
    try {
      const sale = await this.model.findByPk(id);
      if (!sale) throw new Error(`Sale with id ${id} not found`);
      await sale.destroy();
      return sale;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = SaleRepository;
