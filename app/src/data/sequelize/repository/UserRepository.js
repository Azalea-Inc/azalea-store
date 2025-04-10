const User = require("../../../models/User");
const UserEntity = require("../entities/UserEntity");

class UserRepository {
  constructor() {
    this.model = UserEntity;
  }

  async save(data) {
    const user = await this.model.create(data);
    return user;
  }

  async getAll() {
    const users = await this.model.findAll({
      attributes: { exclude: ["password"] },
    });
    return users;
  }

  async update(id, data) {
    const user = await this.model.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.update(data);
    return user;
  }

  async delete(id) {
    const user = await this.model.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
  }

  async getById(id) {
    return await this.model.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  }

  async getByEmail(email) {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async deactivateUser(id) {
    const user = await this.model.findByPk(id);
    if (!user) throw new Error("User not found");
    user.active = false;
    await user.save();
  }

  async activateUser(id) {
    const user = await this.model.findByPk(id);
    if (!user) throw new Error("User not found");
    user.active = true;
    await user.save();
  }

  async changePassword(id, password, oldPassword) {
    if (!password) throw new Error("Password is required");
    const user = await this.model.findByPk(id);
    if (!user) throw new Error("User not found");
    const saveUser = User.buildToData(user);
    saveUser.changePassword(oldPassword, password);
    await user.update(saveUser);
  }
}

module.exports = UserRepository;
