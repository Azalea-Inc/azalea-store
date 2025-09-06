const { randomUUID } = require("crypto");

class Product {
  constructor(code, name, salePrice, stock) {
    this.code = code;
    this.name = name;
    this.salePrice = salePrice;
    this.stock = stock;
  }

  setStatus(status) {
    this.isActive = status;
  }

  setMinStock(minStock) {
    this.minStock = minStock;
  }

  deactivate() {
    this.isActive = false;
  }

  activate() {
    this.isActive = true;
  }

  generateId() {
    this.id = randomUUID();
  }

  setDescription(description) {
    this.description = description;
  }

  setProductType(productType) {
    this.productType = productType;
  }

  setUnitOfMeasure(unitOfMeasure) {
    this.unitOfMeasure = unitOfMeasure;
  }

  static build(data) {
    const {
      code,
      name,
      salePrice,
      stock,
      minStock,
      description,
      productType,
      unitOfMeasure,
    } = data;
    if (!code || !name || !salePrice) {
      throw new Error("Code, name, and salePrice are required fields");
    }

    if (!productType) {
      throw new Error("Product type is required");
    }

    const product = new Product(code, name, salePrice, stock);
    product.generateId();
    product.setDescription(description);
    product.setMinStock(minStock);
    product.setStatus(true);
    product.setProductType(productType);
    product.setUnitOfMeasure(unitOfMeasure);
    return product;
  }
}

module.exports = Product;
