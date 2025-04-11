const Sale = require("../models/Sale");
const SaleRepository = require("../data/sequelize/repository/SaleRepository");

class SaleController {
  constructor() {
    this.respository = new SaleRepository();
  }

  async addSale(data) {
    const sale = Sale.build(data);
    const createdSale = await this.respository.addSale(sale);
    return createdSale;
  }
}

module.exports = SaleController;
