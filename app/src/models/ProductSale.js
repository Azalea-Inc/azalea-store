class ProductSale {
  constructor(product, quantity) {
    this.productId = product.id;
    this.productName = product.name;
    this.price = product.price;
    this.quantity = quantity;
    this.date = new Date();
  }

  addQuantity(amount) {
    this.quantity += amount;
  }

  subtractQuantity(amount) {
    this.quantity -= amount;
  }

  getTotalPrice() {
    return this.quantity * this.price;
  }
}

module.exports = ProductSale;
