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

  async setTurnToSession(sessionId, turnId) {
    const authController = new AuthController();
    await authController.setTurn(sessionId, turnId);
  }

  async removeTurnToSession(sessionId, closeAmount) {
    const authController = new AuthController();
    await authController.removeTurn(sessionId);
  }

  async openTurn(req, res) {
    try {
      const turn = await this.controller.openTurn(req.body, req.session);
      await this.setTurnToSession(req.session.id, turn.id);

      res.status(200).json({ message: "Box opened successfully", data: turn });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async closeTurn(req, res) {
    try {
      await this.controller.closeTurn(req.session.turnId, req.body.closeAmount);
      await this.removeTurnToSession(req.session.id);
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
      const turn = await this.controller.showTurn(req.params.id);
      if (!turn) res.status(404).json({ error: "Turn not found" });

      res.status(200).json({
        message: "Turn retrieved successfully",
        data: turn,
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

  async initTurn(req, res) {
    try {
      const turn = await this.controller.getCurrentTurn(req.session);
      if (!turn) return res.status(404).json({ error: "Turn not found" });

      if (!req.session.turnId)
        await this.setTurnToSession(req.session.id, turn.id);

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
    this.router.post("/current/close", this.closeTurn.bind(this));
    this.router.get("/", this.showTurns.bind(this));
    this.router.post("/:id/movement", this.createMovement.bind(this));
    this.router.get("/:id", this.showTurn.bind(this));
    this.router.get("/:id/movements", this.showMovementsByTurn.bind(this));
    this.router.get("/current/me/", this.initTurn.bind(this));
    router.use("/turns", this.applyMiddlewares(["auth"]), this.router);
  }
}

module.exports = TurnRequest;
