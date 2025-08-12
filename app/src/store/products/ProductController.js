const ProductRepository = require("./ProductRepository");
const Product = require("$models/Product");
const Inventory = require("$models/Inventory");

class ProductController {
  #repository;
  #inventoryRepository;

  constructor() {
    this.#repository = new ProductRepository();
  }

  async addProduct(data) {
    const product = Product.build(data);
    if (data.hasInventory) {
      const inventory = Inventory.build({
        productId: product.id,
        salePrice: data.salePrice,
        ...data,
      });
      return await this.#repository.addProductAndInventory(product, inventory);
    }
    return await this.#repository.addProduct(product);
  }

  async getProducts(page = 1, limit = 10) {
    return this.#repository.getProducts(page, limit);
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
