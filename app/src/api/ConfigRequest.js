const express = require("express");
const ConfigController = require("../controllers/ConfigController");

class ConfigRequest {
  constructor() {
    this.router = express.Router();
    this.controller = new ConfigController();
  }

  async getConfig(req, res) {
    try {
      const config = await this.controller.getConfig();
      res
        .status(200)
        .json({ message: "Config retrieved successfully", data: config });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateConfig(req, res) {
    try {
      const result = await this.controller.updateConfig(req.body);
      res
        .status(200)
        .json({ message: "Config updated successfully", data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async renameStore(req, res) {
    try {
      const result = await this.controller.renameStore(req.body.name);
      res
        .status(200)
        .json({ message: "Storage renamed successfully", data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    this.router.get("/", this.getConfig.bind(this));
    this.router.patch("/", this.updateConfig.bind(this));
    this.router.patch("/rename", this.renameStore.bind(this));
    router.use("/config", this.router);
  }
}

module.exports = ConfigRequest;
