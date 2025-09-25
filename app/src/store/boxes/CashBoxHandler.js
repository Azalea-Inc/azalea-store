const BaseHandler = require("$api/BaseHandler");
const { Router } = require("express");
const CashBoxController = require("./CashBoxController");

class CashBoxHandler extends BaseHandler {
  constructor() {
    super();
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
      const boxes = await this.controller.showCashBoxes();
      res.status(200).json({ message: "Boxes retrieved successfully", boxes });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showCashBoxInfo(req, res) {
    try {
      const cashBox = await this.controller.showCashBoxInfo(req.params.id);
      const clientId = req.cookies?.clientId;

      if (!clientId)
        return res
          .status(200)
          .json({ message: "Box info retrieved successfully", cashBox });

      res.status(200).json({
        message: "Box info retrieved successfully",
        cashBox: { ...cashBox, isMine: clientId === cashBox.clientId },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateCashBox(req, res) {
    try {
      const cashBox = await this.controller.updateCashBox(
        req.params.id,
        req.body,
      );

      res
        .status(200)
        .json({ message: "Box updated successfully", data: cashBox });
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

  async showCashBoxTurns(req, res) {
    try {
      const registries = await this.controller.showCashBoxTurns(req.params.id);

      res.status(200).json({
        message: "Registries retrieved successfully",
        data: registries,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async setClient(req, res) {
    try {
      const cashBox = await this.controller.setClient(
        req.params.id,
        req.cookies?.clientId,
      );

      res.cookie("clientId", cashBox.clientId, {
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ message: "Client set successfully", cashBox });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    this.router.post("/", this.createCashBox.bind(this));
    this.router.get("/", this.showCashBoxes.bind(this));
    this.router.get("/:id", this.showCashBoxInfo.bind(this));
    this.router.put("/:id", this.updateCashBox.bind(this));
    this.router.patch("/:id/rename", this.renameCashBox.bind(this));
    this.router.delete("/:id", this.removeCashBox.bind(this));
    this.router.get("/:id/turns", this.showCashBoxTurns.bind(this));
    this.router.post("/:id/client", this.setClient.bind(this));
    router.use("/cashbox", this.applyMiddlewares(["auth"]), this.router);
  }
}

module.exports = CashBoxHandler;
