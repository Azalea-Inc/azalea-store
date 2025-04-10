const User = require("../models/User");
const UserRepository = require("../data/sequelize/repository/UserRepository");

class UserController {
  constructor() {
    this.repository = new UserRepository();
  }

  async addUser(data) {
    const user = User.build(data);
    const exists = await this.repository.getByEmail(user.email);
    if (exists) throw new Error("User already exists");

    await this.repository.save(user);
    return user;
  }

  async getUserByEmail(email) {
    return await this.repository.getByEmail(email);
  }

  async showUsers() {
    const users = await this.repository.getAll();
    return users;
  }

  async showUserInfo(id) {
    const user = await this.repository.getById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async deactivateUser(id) {
    await this.repository.deactivateUser(id);
  }

  async activateUser(id) {
    await this.repository.activateUser(id);
  }

  async removerUser(id) {
    await this.repository.delete(id);
  }

  async changePassword(id, password, oldPassword) {
    await this.repository.changePassword(id, password, oldPassword);
  }
}

module.exports = UserController;
