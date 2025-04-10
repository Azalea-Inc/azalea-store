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

  async openCashBox(req, res) {
    try {
      await this.controller.openCashBox(req.body);

      res.status(200).json({ message: "Box opened successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    this.router.post("/", this.createCashBox.bind(this));
    this.router.post("/open", this.openCashBox.bind(this));
    router.use("/cashbox", this.router);
  }
}

module.exports = CashBoxRequest;
