const BaseRequest = require("$api/BaseRequest");
const express = require("express");
const UserController = require("./UserController");

class UserRequest extends BaseRequest {
  constructor() {
    super();
    this.router = express.Router();
    this.controller = new UserController();
  }

  async addUser(req, res) {
    try {
      await this.controller.addUser(req.body);
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showUsers(req, res) {
    try {
      const users = await this.controller.showUsers();
      res
        .status(200)
        .json({ message: "Users retrieved successfully", data: users });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showUserInfo(req, res) {
    try {
      const user = await this.controller.showUserInfo(req.params.id);
      res
        .status(200)
        .json({ message: "User retrieved successfully", data: user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deactivateUser(req, res) {
    try {
      await this.controller.deactivateUser(req.params.id);
      res.status(200).json({ message: "User deactivated successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async activateUser(req, res) {
    try {
      await this.controller.activateUser(req.params.id);
      res.status(200).json({ message: "User activated successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async removerUser(req, res) {
    try {
      await this.controller.removerUser(req.params.id);
      res.status(200).json({ message: "User removed successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async changePassword(req, res) {
    try {
      await this.controller.changePassword(
        req.params.id,
        req.body.password,
        req.body.oldPassword,
      );
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    this.router.post("/", this.addUser.bind(this));
    this.router.get("/", this.showUsers.bind(this));
    this.router.get("/:id", this.showUserInfo.bind(this));
    this.router.patch("/:id/deactivate", this.deactivateUser.bind(this));
    this.router.patch("/:id/activate", this.activateUser.bind(this));
    this.router.delete("/:id", this.removerUser.bind(this));
    this.router.patch("/:id/password", this.changePassword.bind(this));

    router.use("/users", this.router);
  }
}

module.exports = UserRequest;
