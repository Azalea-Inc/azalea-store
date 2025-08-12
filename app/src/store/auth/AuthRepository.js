const User = require("$models/User");
const UserEntity = require("$store/users/UserEntity");

class AuthRepository {
  constructor() {
    this.model = UserEntity;
  }

  async login(email, password) {
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
}

module.exports = AuthRepository;
