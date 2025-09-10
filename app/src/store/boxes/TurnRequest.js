const BaseRequest = require("$api/BaseRequest");
const express = require("express");
const TurnController = require("./TurnController");
const AuthController = require("../auth/AuthController");

class TurnRequest extends BaseRequest {
  constructor() {
    super();
    this.router = express.Router();
    this.controller = new TurnController();
  }

  async openTurn(req, res) {
    try {
      const registry = await this.controller.openTurn(req.body, req.session);
      const authController = new AuthController();
      await authController.setTurn(req.session.id, registry.id);

      res
        .status(200)
        .json({ message: "Box opened successfully", data: registry });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async closeTurn(req, res) {
    try {
      await this.controller.closeTurn(req.params.id, req.body.closeAmount);
      res.status(200).json({ message: "Turn closed successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showTurns(req, res) {
    try {
      const registries = await this.controller.showTurns(req.params.id);

      res.status(200).json({
        message: "Registries retrieved successfully",
        data: registries,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showTurn(req, res) {
    try {
      const registry = await this.controller.showTurn(req.params.id);

      res.status(200).json({
        message: "Registry retrieved successfully",
        data: registry,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async createMovement(req, res) {
    try {
      const movement = await this.controller.createMovement(
        req.params.id,
        req.body,
      );

      res.status(200).json({
        message: "Movement retrieved successfully",
        data: movement,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showMovementsByTurn(req, res) {
    try {
      const movements = await this.controller.showMovementsByTurn(
        req.params.id,
      );
      res.status(200).json({
        message: "Movements retrieved successfully",
        data: movements,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCurrentTurn(req, res) {
    try {
      const { turnId } = req.session;
      const turn = await this.controller.showTurn(turnId);
      res.status(200).json({
        message: "Current turn retrieved successfully",
        turn,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    this.router.post("/", this.openTurn.bind(this));
    this.router.post("/:id/close", this.closeTurn.bind(this));
    this.router.get("/", this.showTurns.bind(this));
    this.router.post("/:id/movement", this.createMovement.bind(this));
    this.router.get("/:id", this.showTurn.bind(this));
    this.router.get("/:id/movements", this.showMovementsByTurn.bind(this));
    this.router.get("/current/me/", this.getCurrentTurn.bind(this));
    router.use("/turns", this.applyMiddlewares(["auth"]), this.router);
  }
}

module.exports = TurnRequest;
