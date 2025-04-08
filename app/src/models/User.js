const { randomUUID } = require("crypto");
const crypto = require("crypto");

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

  encryptedPassword(password) {
    const hash = crypto.createHash("sha256");
    this.password = password;
    const encryptedPassword = hash.update(password).digest("hex");
    this.password = encryptedPassword;
  }

  static build(data) {
    const { email, name, password } = data;
    const user = new User(email, name);
    user.#generateId();
    user.encryptedPassword(password);
    return user;
  }
}

module.exports = User;
