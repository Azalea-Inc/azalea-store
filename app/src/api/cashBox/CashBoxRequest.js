const { Router } = require("express");
const CashBoxController = require("../../controllers/CashBoxController");

class CashBoxRequest {
  constructor() {
    this.router = Router();
    this.controller = new CashBoxController();
  }

  async createBox(req, res) {
    try {
      await this.controller.createBox(req.body);

      res.status(201).json({ message: "Box created successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    this.post("/", this.createBox.bind(this));
    this.get("/", this.showBoxes.bind(this));
    this.get("/:id", this.shwowBoxById.bind(this));
    this.delete("/:id", this.deleteBox.bind(this));

    router.use("/cashbox", this.router);
  }
}

module.exports = CashBoxRequest;
