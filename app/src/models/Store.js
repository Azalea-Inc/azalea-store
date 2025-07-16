const { randomUUID } = require("crypto");

class Store {
  constructor(name, location) {
    this.name = name;
    this.location = location;
  }

  generateId() {
    this.id = randomUUID();
  }

  static build(data) {
    const store = new Store(data.name, data.location);
    store.generateId();
    return store;
  }
}

module.exports = Store;
