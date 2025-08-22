const AuthRepository = require("./AuthRepository");
const TokenManager = require("$common/TokenManager");

class AuthController {
  constructor() {
    this.repository = new AuthRepository();
    this.tokenManager = new TokenManager();
  }

  async login(email, password) {
    const user = await this.repository.login(email, password);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const token = this.tokenManager.generateToken(user);
    return token;
  }

  async getUserInfo(token) {
    const userInfo = await this.tokenManager.getUserInfo(token);
    return userInfo;
  }
}

module.exports = AuthController;
