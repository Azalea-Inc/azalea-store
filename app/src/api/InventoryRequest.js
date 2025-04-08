const express = require("express");
const InventoryController = require("../controllers/InventoryController");

class InventoryRequest {
  constructor() {
    this.router = express.Router();
    this.controller = new InventoryController();
  }

  async addInventory(req, res) {
    try {
      await this.controller.addInventory(req.body);
      res.status(201).json({ message: "Inventory added successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getInventories(req, res) {
    try {
      const inventories = await this.controller.getAll();
      res.status(200).json({
        message: "Inventories fetched successfully",
        data: inventories,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeInventory(req, res) {
    try {
      await this.controller.removeInventory(req.params.id);
      res.status(200).json({ message: "Inventory removed successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    this.router.post("/", this.addInventory.bind(this));
    this.router.get("/", this.getInventories.bind(this));
    this.router.delete("/:id", this.removeInventory.bind(this));

    router.use("/inventory", this.router);
  }
}

module.exports = InventoryRequest;
