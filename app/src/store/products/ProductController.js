const ProductRepository = require("./ProductRepository");
const Product = require("$models/Product");

class ProductController {
  #repository;

  constructor() {
    this.#repository = new ProductRepository();
  }

  async addProduct(data) {
    const product = Product.build(data);
    return await this.#repository.addProduct(product);
  }

  async addProducts(data) {
    const products = data.map(Product.build);
    return await this.#repository.addProducts(products);
  }

  async getProducts(page = 1, limit = 10) {
    return this.#repository.getProducts(page, limit);
  }

  async updateProduct(id, product) {
    return await this.#repository.updateProduct(id, product);
  }

  async showProductDetail(id) {
    return this.#repository.getProductById(id);
  }

  async deactivateProduct(id) {
    await this.#repository.deactivateProduct(id);
  }

  async activateProduct(id) {
    await this.#repository.activateProduct(id);
  }

  async removeProduct(id) {
    await this.#repository.removeProduct(id);
  }

  async getProductsCount() {
    return this.#repository.getProductsCount();
  }
}

module.exports = ProductController;
