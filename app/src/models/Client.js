const { randomUUID } = require("crypto");

class Client {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  generateId() {
    this.id = randomUUID();
  }

  active() {
    this.isActive = true;
  }

  static build(data) {
    const { name, email } = data;
    const client = new Client(name, email);
    client.generateId();
    client.active();
    return client;
  }
}

module.exports = Client;
