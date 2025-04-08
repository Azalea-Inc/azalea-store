const express = require("express");
const UserController = require("../controllers/UserController");

class UserRequest {
  constructor() {
    this.router = express.Router();
    this.controller = new UserController();
  }

  registerUser(req, res) {
    this.controller
      .registerUser(req.body)
      .then((user) =>
        res.status(201).json({ message: "User created successfully" }),
      )
      .catch((error) => res.status(400).json({ error }));
  }

  async showUsers(req, res) {
    try {
      const users = await this.controller.showUsers();
      res
        .status(200)
        .json({ message: "Users retrieved successfully", data: users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }

  setupRoutes(router) {
    this.router.post("/", this.registerUser.bind(this));
    this.router.get("/", this.showUsers.bind(this));

    router.use("/users", this.router);
  }
}

module.exports = UserRequest;
