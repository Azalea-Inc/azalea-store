const Sale = require("../../models/Sale");
const Ticket = require("../../models/Ticket");
const SaleRepository = require("../sales/SaleRepository");
const ProductRepository = require("../products/ProductRepository");

class SaleController {
  constructor() {
    this.repository = new SaleRepository();
  }

  async addSale(data) {
    const sale = Sale.build(data);
    const createdSale = await this.repository.addSale(sale);
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

  async showSales(id) {
    const sales = await this.repository.showSales(id);
    return sales;
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
}

module.exports = SaleController;
