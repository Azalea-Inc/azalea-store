const AuthRepository = require("../data/sequelize/repository/AuthRepository");

class AuthController {
  constructor() {
    this.repository = new AuthRepository();
  }

  async login(email, password) {
    const user = await this.repository.login(email, password);
    return user;
  }
}

module.exports = AuthController;
