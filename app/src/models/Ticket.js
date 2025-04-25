class Ticket {
  constructor(sale, message) {
    this.sale = sale;
    this.message = message;
  }

  print() {
    return `Mensaje: ${this.message}`;
  }

  static build(data) {
    const { sale, message } = data;
    const ticket = new Ticket(sale, message);
    return ticket;
  }
}

module.exports = Ticket;
