class CashBox {
  constructor(name, location) {
    this.name = name;
    this.location = location;
  }

  static build(data) {
    const { name, location } = data;
    const cashBox = new CashBox(name, location);
    return cashBox;
  }
}

module.exports = CashBox;
