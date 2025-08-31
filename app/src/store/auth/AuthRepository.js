const User = require("$models/User");
const UserEntity = require("$store/users/UserEntity");
const SessionEntity = require("./SessionEntity");

class AuthRepository {
  constructor() {
    this.model = UserEntity;
  }

  async validateLogin(email, password) {
    const userRecord = await this.model.findOne({ where: { email } });

    if (!userRecord) {
      throw new Error("No user found");
    }
    const user = User.buildToData(userRecord);

    if (!userRecord || !user.comparePassword(password)) {
      throw new Error("Invalid email or password");
    }
    return user;
  }

  async getUserInfo(id) {
    return await this.model.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  }

  async createSession(session) {
    return await SessionEntity.create(session);
  }

  async getSession(tokenId) {
    return await SessionEntity.findOne({ where: { tokenId, isActive: true } });
  }

  async logout(tokenId) {
    await this.model.update({ isActive: false }, { where: { tokenId } });
  }
}

module.exports = AuthRepository;
