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

  async showSale(req, res) {
    try {
      const sale = await this.controller.showSale(req.params.id);
      res
        .status(200)
        .json({ message: "Sale retrieved successfully", data: sale });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showSales(req, res) {
    try {
      const sales = await this.controller.showSales(req.params.id);
      res
        .status(200)
        .json({ message: "Sales retrieved successfully", data: sales });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async printTicket(req, res) {
    try {
      await this.controller.printTicket(req.params.id);
      res.status(200).json({ message: "Ticket retrieved successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeSale(req, res) {
    try {
      const sale = await this.controller.removeSale(req.params.id);
      res
        .status(200)
        .json({ message: "Sale removed successfully", data: sale });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    this.router.post("/", this.addSale.bind(this));
    this.router.get("/:id", this.showSale.bind(this));
    this.router.get("/:id/all", this.showSales.bind(this));
    this.router.post("/:id/print", this.printTicket.bind(this));
    this.router.delete("/:id", this.removeSale.bind(this));

    router.use("/sales", this.router);
  }
}

module.exports = SaleRequest;
