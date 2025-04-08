class CashBox {
  static build(data) {
    const { name, location } = data;
    const cashBox = new CashBox(name, location);
    return cashBox;
  }
}

module.exports = CashBox;
