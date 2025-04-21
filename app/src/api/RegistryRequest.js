const express = require("express");
const CashBoxController = require("../controllers/CashBoxController");

class RegistryRequest {
  constructor() {
    this.router = express.Router();
    this.controller = new CashBoxController();
  }

  async showRegistries(req, res) {
    try {
      const registries = await this.controller.showRegistries(req.params.id);

      res.status(200).json({
        message: "Registries retrieved successfully",
        data: registries,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showRegistry(req, res) {
    try {
      const registry = await this.controller.showRegistry(req.params.id);

      res.status(200).json({
        message: "Registry retrieved successfully",
        data: registry,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async createMovement(req, res) {
    try {
      const movement = await this.controller.createMovement(
        req.params.id,
        req.body,
      );

      res.status(200).json({
        message: "Movement retrieved successfully",
        data: movement,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showMovementsByRegistry(req, res) {
    try {
      const movements = await this.controller.showMovementsByRegistry(
        req.params.id,
      );
      res.status(200).json({
        message: "Movements retrieved successfully",
        data: movements,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    router.get("/registries", this.showRegistries.bind(this));
    router.post("/registries/:id/movement", this.createMovement.bind(this));
    router.get("/registries/:id", this.showRegistry.bind(this));
    router.get(
      "/registries/:id/movements",
      this.showMovementsByRegistry.bind(this),
    );
    router.use("/registries", this.router);
  }
}

module.exports = RegistryRequest;
