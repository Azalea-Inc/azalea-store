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

  async getUserById(id) {
    // const user = await this.repository.findById(id);
    // return user;
  }
}

module.exports = UserController;
