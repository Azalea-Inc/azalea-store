const { randomUUID } = require("crypto");

class Product {
  constructor(code, name, price) {
    this.code = code;
    this.name = name;
    this.price = price;
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

  static build(data) {
    const { code, name, price, description } = data;
    if (!code || !name || !price) {
      throw new Error("Code, name, and price are required fields");
    }
    const product = new Product(code, name, price);
    product.setDescription(description);
    product.generateId();
    product.setStatus(true);
    return product;
  }

  toString() {
    return `Product(id=${this.id}, name=${this.name}, price=${this.price})`;
  }
}

module.exports = Product;
