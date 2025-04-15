class CashBoxMovement {
  constructor(id, amount, type, date) {
    this.id = id;
    this.amount = amount;
    this.type = type;
    this.date = date;
  }

  static create(id, amount, type, date) {
    return new CashBoxMovement(id, amount, type, date);
  }

  static fromObject(obj) {
    return new CashBoxMovement(obj.id, obj.amount, obj.type, obj.date);
  }
}

module.exports = CashBoxMovement;
