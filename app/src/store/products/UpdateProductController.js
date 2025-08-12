const ProductRepository = require("./ProductRepository");

class UpdateProductController {
  #repository;

  constructor() {
    this.#repository = new ProductRepository();
  }

  async updatePrice(productId, price) {
    await this.#repository.updateProduct(productId, { price });
  }
}

module.exports = UpdateProductController;
