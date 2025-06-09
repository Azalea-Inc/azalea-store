const { randomUUID } = require("crypto");

class Product {
  constructor(code, name, costPrice) {
    this.code = code;
    this.name = name;
    this.costPrice = costPrice;
  }

  setStatus(status) {
    this.isActive = status;
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
    const { code, name, costPrice, description, productType, unitOfMeasure } =
      data;
    if (!code || !name || !costPrice) {
      throw new Error("Code, name, and costPrice are required fields");
    }

    if (!productType) {
      throw new Error("Product type is required");
    }

    const product = new Product(code, name, costPrice);
    product.setDescription(description);
    product.generateId();
    product.setStatus(true);
    product.setProductType(productType);
    product.setUnitOfMeasure(unitOfMeasure);
    return product;
  }

  toString() {
    return `Product(id=${this.id}, name=${this.name}, price=${this.costPrice})`;
  }
}

module.exports = Product;
