const ProductEntity = require("./ProductEntity");

class ProductDto {
  constructor(product) {
    this.id = product.id;
    this.code = product.code;
    this.name = product.name;
    this.salePrice = product.salePrice;
    this.minStock = product.minStock;
    this.productType = product.productType;
    this.unitOfMeasure = product.unitOfMeasure;
    this.stock = product.inventory?.stock ?? 0;
    this.isActive = product.isActive;
  }
}

class ProductRepository {
  constructor() {
    this.model = ProductEntity;
  }

  async addProduct(product) {
    return await this.model.create(
      {
        ...product,
        inventory: {
          stock: product.stock || 0,
        },
      },
      {
        include: ["inventory"],
      },
    );
  }

  async addProducts(products) {
    const t = await this.model.sequelize.transaction();

    try {
      const createdProducts = [];

      for (const product of products) {
        const created = await this.model.create(
          {
            ...product,
            inventory: {
              stock: product.stock || 0,
            },
          },
          {
            include: ["inventory"],
            transaction: t,
          },
        );
        createdProducts.push(created);
      }

      await t.commit();
      return createdProducts;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getProducts(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const products = await this.model.findAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: ["inventory"],
    });
    return products.map((product) => {
      return new ProductDto(product);
    });
  }

  async getProductsCount() {
    return await this.model.count();
  }

  async getProductById(id) {
    const product = await this.model.findByPk(id);
    return product;
  }

  async updateProduct(id, data) {
    const product = await this.model.findByPk(id, {
      include: ["inventory"],
    });
    if (!product) {
      throw new Error("Product not found");
    }

    await this.model.update(data, { where: { id } });

    let inventory = product.inventory;
    inventory.stock = data.stock;
    if (inventory) {
      await inventory.save();
    }
  }

  async deactivateProduct(id) {
    const product = await this.model.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }
    await this.model.update({ isActive: false }, { where: { id } });
  }

  async activateProduct(id) {
    const product = await this.model.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }
    await this.model.update({ isActive: true }, { where: { id } });
  }

  async removeProduct(id) {
    const product = await this.model.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }
    await product.destroy();
    return product;
  }
}

module.exports = ProductRepository;
