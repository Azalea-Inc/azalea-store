const express = require("express");
const UserController = require("../controllers/UserController");

class UserRequest {
  constructor() {
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

  setupRoutes(router) {
    this.router.post("/", this.addUser.bind(this));
    this.router.get("/", this.showUsers.bind(this));
    this.router.get("/:id", this.showUserInfo.bind(this));

    router.use("/users", this.router);
  }
}

module.exports = UserRequest;
