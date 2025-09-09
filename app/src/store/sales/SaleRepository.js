const SaleEntity = require("./SaleEntity");
const ProductsSalesEntity = require("./ProductsSalesEntity");
const CashBoxEntity = require("../boxes/CashBoxEntity");

class SaleRepository {
  constructor() {
    this.model = SaleEntity;
    this.productsSalesModel = ProductsSalesEntity;
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

  async addProduct(id, product) {
    try {
      const sale = await this.model.findByPk(id);
      if (!sale) throw new Error(`Sale with id ${id} not found`);

      const existingProductSale = await this.productsSalesModel.findOne({
        where: {
          saleId: sale.id,
          productId: product.id,
        },
      });

      if (existingProductSale) {
        existingProductSale.quantity =
          (existingProductSale.quantity || 1) + (product.quantity || 1);
        await existingProductSale.save();
      }

      return await this.productsSalesModel.create({
        saleId: sale.id,
        productId: product.id,
      });
    } catch (error) {
      throw new Error(`Error adding product to sale: ${error.message}`);
    }
  }

  async showProductsForSale(id) {
    try {
      const products = await this.productsSalesModel.findAll({
        where: { saleId: id },
        include: "Products",
      });
      return products;
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

  async getBoxConfig(clientId) {
    const boxConfig = await CashBoxEntity.findOne({
      where: { clientId },
    });
    return boxConfig;
  }
}

module.exports = SaleRepository;
