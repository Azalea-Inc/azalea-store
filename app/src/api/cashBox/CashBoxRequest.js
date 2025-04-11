const { Router } = require("express");
const CashBoxController = require("../../controllers/CashBoxController");

class CashBoxRequest {
  constructor() {
    this.router = Router();
    this.controller = new CashBoxController();
  }

  async createCashBox(req, res) {
    try {
      const cashBox = await this.controller.createCashBox(req.body);

      res
        .status(201)
        .json({ message: "Box created successfully", data: cashBox });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showCashBoxes(req, res) {
    try {
      const cashBoxes = await this.controller.showCashBoxes();

      res
        .status(200)
        .json({ message: "Boxes retrieved successfully", data: cashBoxes });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showCashBoxInfo(req, res) {
    try {
      const cashBox = await this.controller.showCashBoxInfo(req.params.id);

      res
        .status(200)
        .json({ message: "Box info retrieved successfully", data: cashBox });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async renameCashBox(req, res) {
    try {
      const cashBox = await this.controller.renameCashBox(
        req.params.id,
        req.body.name,
      );

      res
        .status(200)
        .json({ message: "Box renamed successfully", data: cashBox });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeCashBox(req, res) {
    try {
      await this.controller.removeCashBox(req.params.id);
      res.status(200).json({ message: "Box removed successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async openCashBox(req, res) {
    try {
      await this.controller.openCashBox(req.body);

      res.status(200).json({ message: "Box opened successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async closeCashBox(req, res) {
    try {
      await this.controller.closeCashBox(req.params.id, req.body.closeAmount);
      res.status(200).json({ message: "Box closed successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
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

  async showCashBoxRegistries(req, res) {
    try {
      const registries = await this.controller.showCashBoxRegistries(
        req.params.id,
      );

      res.status(200).json({
        message: "Registries retrieved successfully",
        data: registries,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    this.router.post("/", this.createCashBox.bind(this));
    this.router.get("/", this.showCashBoxes.bind(this));
    this.router.get("/:id", this.showCashBoxInfo.bind(this));
    this.router.patch("/:id/rename", this.renameCashBox.bind(this));
    this.router.delete("/:id", this.removeCashBox.bind(this));
    this.router.post("/:id/close", this.closeCashBox.bind(this));
    this.router.get("/:id/registries", this.showCashBoxRegistries.bind(this));
    this.router.post("/open", this.openCashBox.bind(this));
    this.router.get("/registries", this.showRegistries.bind(this));
    router.use("/cashbox", this.router);
  }
}

module.exports = CashBoxRequest;
