const { Router } = require("express");
const SalesController = require("../../controllers/SalesController");

class SalesRequest {
  constructor() {
    this.router = Router();
    this.controller = new SalesController();
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
    router.use("/sales", this.router);
  }
}

module.exports = SalesRequest;
