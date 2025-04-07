const { randomUUID } = require("crypto");

class User {
  constructor(email, name) {
    this.email = email;
    this.name = name;
    this.roles = [];
  }

  #generateId() {
    this.id = randomUUID();
  }

  setRole(role) {
    this.roles.push(role);
  }

  setRoles(roles) {
    this.roles = roles;
  }

  static build(data) {
    const { email, name, age } = data;
    const user = new User(email, name, age);
    user.#generateId();
    return user;
  }
}

module.exports = User;
