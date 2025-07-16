const User = require("../../../models/User");
const UserEntity = require("../entities/UserEntity");

class AuthRepository {
  constructor() {
    this.model = UserEntity;
  }

  async login(email, password) {
    const userData = await this.model.findOne({ where: { email } });
    const user = User.buildToData(userData);

    if (!userData || !user.comparePassword(password)) {
      throw new Error("Invalid email or password");
    }
    return user;
  }
}

module.exports = AuthRepository;
