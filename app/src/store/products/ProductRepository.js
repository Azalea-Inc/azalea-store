const ProductEntity = require("./ProductEntity");

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

  async addProductAndInventory(productData, inventoryData) {
    try {
      const product = await this.model.create(productData);
      await product.createInventory(inventoryData);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      const products = await this.model.findAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        include: ["inventory"],
      });

      return products.map((e) => {
        const data = e.get({ plain: true });
        const inventory = data.inventory;

        if (!inventory) return data;
        delete data.inventory;
        const product = {
          ...data,
          salePrice: inventory.salePrice,
          stock: inventory.stock,
          inventoryId: inventory.id,
          inventoryIsActive: inventory.isActive,
          inventoryCreatedAt: inventory.createdAt,
          inventoryUpdatedAt: inventory.updatedAt,
        };

        return product;
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
      const product = await this.model.findByPk(id);
      return product;
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
