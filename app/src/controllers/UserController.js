const User = require("../models/User");
const UserRepository = require("../data/sequelize/repository/UserRepository");

class UserController {
  constructor() {
    this.repository = new UserRepository();
  }

  async registerUser(data) {
    const user = User.build(data);
    return user;
  }

  async getUsers() {
    const users = await this.repository.findAll();
    return users;
  }

  async getUserById(id) {
    // const user = await this.repository.findById(id);
    // return user;
  }
}

module.exports = UserController;
