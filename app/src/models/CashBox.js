class CashBox {
  constructor(name, location) {
    this.name = name;
    this.location = location;
  }

  setClientId(clientId) {
    this.clientId = clientId;
  }

  static build(data) {
    const { name, location } = data;
    if (!name || !location) throw new Error("Invalid data");
    const cashBox = new CashBox(name, location);
    return cashBox;
  }
}

module.exports = CashBox;
