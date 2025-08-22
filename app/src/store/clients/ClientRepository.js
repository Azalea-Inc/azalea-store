const ClientEntity = require("./ClientEntity");

class ClientRepository {
  constructor() {
    this.model = ClientEntity;
  }

  async add(client) {
    return this.model.create(client);
  }

  async getAll() {
    const clients = await this.model.findAll();
    return clients;
  }

  async update(id, data) {
    const client = await this.model.findByPk(id);
    if (!client) throw new Error("Client not found");
    await client.update(data);
    return client;
  }

  async delete(id) {
    const client = await this.model.findByPk(id);
    if (!client) throw new Error("Client not found");
    await client.destroy();
    return client;
  }

  async getById(id) {
    const client = await this.model.findByPk(id);
    if (!client) throw new Error("Client not found");
    return client;
  }

  async getByEmail(email) {
    const client = await this.model.findOne({ where: { email } });
    return client;
  }

  async getByPhone(phone) {
    return await this.model.findOne({ where: { phone } });
  }

  async remove(id) {
    const client = await this.model.findByPk(id);
    if (!client) throw new Error("Client not found");
    await client.destroy();
    return client;
  }
}

module.exports = ClientRepository;
