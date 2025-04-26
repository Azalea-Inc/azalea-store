const Sale = require("../models/Sale");
const Ticket = require("../models/Ticket");
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

  async showSale(id) {
    try {
      const sale = await this.respository.showSale(id);
      return sale;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async showSales(id) {
    try {
      const sales = await this.respository.showSales(id);
      return sales;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async printTicket(id) {
    const sale = await this.respository.showSale(id);
    const ticket = Ticket.build({
      sale,
      message: "Sale retrieved successfully",
    });
    console.log(sale);
    console.log(ticket.print());
  }

  async removeSale(id) {
    try {
      const sale = await this.respository.removeSale(id);
      return sale;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = SaleController;
