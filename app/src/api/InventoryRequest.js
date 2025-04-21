const InventoryController = require("../controllers/InventoryController");

class InventoryRequest {
  constructor() {
    this.controller = new InventoryController();
  }

  async addInventory(req, res) {
    try {
      const inventory = await this.controller.addInventory(req.body);
      res
        .status(201)
        .json({ message: "Inventory added successfully", data: inventory });
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

  async showInventoryDetail(req, res) {
    try {
      const inventory = await this.controller.getById(req.params.id);
      res.status(200).json({
        message: "Inventory fetched successfully",
        data: inventory,
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

  async activateProductToInventory(req, res) {
    try {
      await this.controller.activateProductToInventory(req.params.id);
      res.status(200).json({ message: "Product activated successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deactivateProductToInventory(req, res) {
    try {
      await this.controller.deactivateProductToInventory(req.params.id);
      res.status(200).json({ message: "Product deactivated successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async addMovementToInventory(req, res) {
    try {
      const movement = await this.controller.addMovementToInventory(
        req.params.id,
        req.body,
      );
      res
        .status(200)
        .json({ message: "Movement created successfully", data: movement });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showMovementsToInventory(req, res) {
    try {
      const movements = await this.controller.showMovementsToInventory(
        req.params.id,
      );
      res.status(200).json({
        message: "Movements fetched successfully",
        data: movements,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showMovementDetail(req, res) {
    try {
      const movement = await this.controller.showMovementDetail(req.params.id);
      res.status(200).json({
        message: "Movement fetched successfully",
        data: movement,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = InventoryRequest;
