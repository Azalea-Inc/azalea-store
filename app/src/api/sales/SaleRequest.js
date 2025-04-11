const { Router } = require("express");
const SaleController = require("../../controllers/SaleController");

class SaleRequest {
  constructor() {
    this.router = Router();
    this.controller = new SaleController();
  }

  async addSale(req, res) {
    try {
      const sale = await this.controller.addSale(req.body);
      res.status(201).json({ message: "Sale added successfully", data: sale });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    router.post("/sales", this.addSale.bind(this));
    router.use("/sales", this.router);
  }
}

module.exports = SaleRequest;
