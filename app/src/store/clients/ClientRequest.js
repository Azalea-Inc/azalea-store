const express = require("express");
const ClientController = require("./ClientController");

class ClientRequest {
  constructor() {
    this.router = express.Router();
    this.controller = new ClientController();
  }

  async addClient(req, res) {
    try {
      const client = await this.controller.addClient(req.body);
      res
        .status(201)
        .json({ message: "Client added successfully", data: client });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getClients(req, res) {
    try {
      const clients = await this.controller.getClients();
      res
        .status(200)
        .json({ message: "Clients retrieved successfully", data: clients });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getClientById(req, res) {
    try {
      const client = await this.controller.getClientById(req.params.id);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res
        .status(200)
        .json({ message: "Client retrieved successfully", data: client });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getClientByEmail(req, res) {
    try {
      const client = await this.controller.getClientByEmail(req.params.email);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res
        .status(200)
        .json({ message: "Client retrieved successfully", data: client });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateClient(req, res) {
    try {
      const updatedClient = await this.controller.updateClient(
        req.params.id,
        req.body,
      );
      if (!updatedClient) {
        return res.status(404).json({ message: "Client not found" });
      }
      res
        .status(200)
        .json({ message: "Client updated successfully", data: updatedClient });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteClient(req, res) {
    try {
      const deleted = await this.controller.deleteClient(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    this.router.post("/", this.addClient.bind(this));
    this.router.get("/", this.getClients.bind(this));
    this.router.get("/:id", this.getClientById.bind(this));
    this.router.put("/:id", this.updateClient.bind(this));
    this.router.get("/email/:email", this.getClientByEmail.bind(this));
    this.router.delete("/:id", this.deleteClient.bind(this));

    router.use("/clients", this.router);
  }
}

module.exports = ClientRequest;
