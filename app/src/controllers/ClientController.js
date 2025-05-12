const Client = require("../models/Client");
const ClientRepository = require("../data/sequelize/repository/ClientRepository");

class ClientController {
  constructor() {
    this.repository = new ClientRepository();
  }

  async addClient(data) {
    const client = Client.build(data);
    const existingClient = await this.repository.getByEmail(client.email);
    if (existingClient) {
      throw new Error("Un cliente con este email ya existe");
    }
    return await this.repository.add(client);
  }

  async getClients() {
    return await this.repository.getAll();
  }

  async getClientById(id) {
    return await this.repository.getById(id);
  }

  async getClientByEmail(email) {
    return await this.repository.getByEmail(email);
  }

  async deleteClient(id) {
    return await this.repository.delete(id);
  }
}

module.exports = ClientController;
