const { randomUUID } = require("crypto");
const crypto = require("crypto");

const ROLES = {
  ADMIN: "ADMIN",
  CASHIER: "CASHIER",
  MANAGER: "MANAGER",
};

class User {
  constructor(email, name) {
    this.email = email;
    this.name = name;
  }

  #generateId() {
    this.id = randomUUID();
  }

  setId(id) {
    this.id = id;
  }

  setRole(role) {
    if (!ROLES[role]) {
      throw new Error("Invalid role");
    }
    this.role = role;
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

  comparePassword(password) {
    return this.password === this.#generateHash(password);
  }

  setPassword(password) {
    this.password = password;
  }

  static buildToData(data) {
    const { email, name, active, id, password, role } = data;

    const user = new User(email, name);
    user.setId(id);
    user.setIsActive(active);
    user.setPassword(password);
    user.setRole(role);
    return user;
  }

  static build(data) {
    const { email, name, password, role } = data;
    const user = new User(email, name);
    user.#generateId();
    user.encryptedPassword(password);

    if (!role) throw new Error("Role is required");
    user.setRole(role);
    return user;
  }
}

module.exports = User;
