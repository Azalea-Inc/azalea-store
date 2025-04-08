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
    return user;
  }

  async getById(id) {
    const user = await this.model.findByPk(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async getByEmail(email) {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}

module.exports = UserRepository;
