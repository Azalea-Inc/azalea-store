const { randomUUID } = require("crypto");

class Client {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  generateId() {
    this.id = randomUUID();
  }

  active() {
    this.isActive = true;
  }

  static build(data) {
    const { name, email, phone } = data;
    if (!phone) {
      throw new Error("El cliente debe tener un numero de telefono");
    }
    const client = new Client(name, email, phone);
    client.generateId();
    client.active();
    return client;
  }
}

module.exports = Client;
