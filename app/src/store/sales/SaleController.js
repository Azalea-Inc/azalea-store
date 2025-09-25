const Sale = require("../../models/Sale");
const Ticket = require("../../models/Ticket");
const SaleRepository = require("../sales/SaleRepository");
const ProductRepository = require("../products/ProductRepository");

class SaleController {
  constructor() {
    this.repository = new SaleRepository();
  }

  async createSale(session) {
    if (!session.turnId) throw new Error("Turn ID is required");
    const sale = Sale.build(session);
    const createdSale = await this.repository.createSale(sale);
    return createdSale;
  }

  async showSale(id) {
    try {
      const sale = await this.repository.showSale(id);
      return sale;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async showSales() {
    return await this.repository.showSales();
  }

  async showSalesByTurn(turnId) {
    return await this.repository.showSalesByTurn(turnId);
  }

  async addProduct(id, data) {
    const productRepository = new ProductRepository();
    const product = await productRepository.getProductById(data.productId);
    return this.repository.addProduct(id, product);
  }

  async showProductsForSale(id) {
    return this.repository.showProductsForSale(id);
  }

  async printTicket(id) {
    const sale = await this.repository.showSale(id);
    const ticket = Ticket.build({
      sale,
      message: "Sale retrieved successfully",
    });
    console.log(sale);
    console.log(ticket.print());
  }

  async removeSale(id) {
    try {
      const sale = await this.repository.removeSale(id);
      return sale;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getBoxConfig(clientId) {
    return await this.repository.getBoxConfig(clientId);
  }
}

module.exports = SaleController;
