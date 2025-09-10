const AuthRepository = require("./AuthRepository");
const TokenManager = require("$common/TokenManager");
const Session = require("./Session");

class AuthController {
  constructor() {
    this.repository = new AuthRepository();
    this.tokenManager = new TokenManager();
  }

  async login(email, password) {
    const user = await this.repository.validateLogin(email, password);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const session = Session.build(user);
    await this.repository.createSession(session);
    const token = this.tokenManager.generateToken(session);
    return token;
  }

  async auth(token) {
    const { payload } = await this.tokenManager.validateToken(token);
    const session = await this.repository.getSession(payload.tokenId);

    if (!session) {
      throw new Error("No session found");
    }

    if (session.expiresAt < Date.now()) {
      await this.repository.logout(session.tokenId);
      throw new Error("Session expired");
    }

    return session;
  }

  async getUserInfo(userId) {
    const user = await this.repository.getUserInfo(userId);
    return user;
  }

  async getSession(token) {
    const { payload } = await this.tokenManager.validateToken(token);
    return await this.repository.getSession(payload.tokenId);
  }

  async setTurn(id, turnId) {
    await this.repository.updateSession(id, { turnId });
  }

  async logout(tokenId) {
    await this.repository.logout(tokenId);
  }
}

module.exports = AuthController;
