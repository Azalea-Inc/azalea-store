const express = require("express");
const StoreController = require("../controllers/StoreController");

class StoreRequest {
  constructor() {
    this.router = express.Router();
    this.controller = new StoreController();
  }

  async createStore(req, res) {
    try {
      const store = await this.controller.createStore(req.body);
      res.status(201).json(store);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    this.router.post("/", this.createStore.bind(this));
    router.use("/store", this.router);
  }
}

module.exports = StoreRequest;
