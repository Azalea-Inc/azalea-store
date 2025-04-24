const ProductEntity = require("../entities/ProductEntity");

class ProductRepository {
  constructor() {
    this.model = ProductEntity;
  }

  async addProduct(productData) {
    try {
      return await this.model.create(productData);
    } catch (error) {
      throw error;
    }
  }

  async getProducts(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      return await this.model.findAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      console.error("Error getting all products:", error);
      throw error;
    }
  }

  async getProductsCount() {
    try {
      return await this.model.count();
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, data) {
    try {
      const product = await this.model.findByPk(id);
      if (!product) {
        throw new Error("Product not found");
      }
      await this.model.update(data, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async deactivateProduct(id) {
    try {
      const product = await this.model.findByPk(id);
      if (!product) {
        throw new Error("Product not found");
      }
      await this.model.update({ isActive: false }, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async activateProduct(id) {
    try {
      const product = await this.model.findByPk(id);
      if (!product) {
        throw new Error("Product not found");
      }
      await this.model.update({ isActive: true }, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async removeProduct(id) {
    try {
      const product = await this.model.findByPk(id);
      if (!product) {
        throw new Error("Product not found");
      }
      await product.destroy();
      return product;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductRepository;
