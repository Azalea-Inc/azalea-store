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

  setId(id) {
    this.id = id;
  }

  setRole(role) {
    this.roles.push(role);
  }

  setRoles(roles) {
    this.roles = roles;
  }

  setIsActive(active) {
    this.active = active;
  }

  encryptedPassword(password) {
    this.password = this.#generateHash(password);
  }

  #generateHash(password) {
    const hash = crypto.createHash("sha256");
    return hash.update(password).digest("hex");
  }

  changePassword(oldPassword, newPassword) {
    if (this.password !== this.#generateHash(oldPassword)) {
      throw new Error("Incorrect old password");
    }

    this.encryptedPassword(newPassword);
  }

  setPassword(password) {
    this.password = password;
  }

  static buildToData(data) {
    const { email, name, active, id, password } = data;

    const user = new User(email, name);
    user.setId(id);
    user.setIsActive(active);
    user.setPassword(password);
    return user;
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
