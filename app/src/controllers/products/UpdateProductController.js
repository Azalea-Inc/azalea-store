const ProductRepository = require("../../data/sequelize/repository/ProductRepository");

class UpdateProductController {
  constructor() {
    this.repository = new ProductRepository();
  }

  async updatePrice(productId, price) {
    await this.repository.updateProduct(productId, { price });
  }
}

module.exports = UpdateProductController;
