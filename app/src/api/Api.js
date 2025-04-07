const express = require("express");
const cors = require("cors");
const ProductRequest = require("./ProductRequest");
const InventoryRequest = require("./InventoryRequest");
const UserRequest = require("./UserRequest");

const SequelizeDB = require("../data/sequelize/SequelizeDB");

class Api {
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.router = express.Router();
    this.databse = SequelizeDB.getInstance();
  }

  setupRoutes() {
    this.app.use("/api", this.router);
    new InventoryRequest().setupRoutes(this.router);
    new ProductRequest().setupRoutes(this.router);
    new UserRequest().setupRoutes(this.router);
  }

  setupDatabase() {
    SequelizeDB.connect();
  }

  syncDatabase() {
    SequelizeDB.sync();
  }

  start() {
    this.setupDatabase();
    this.setupRoutes();
    this.syncDatabase();
    this.app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  }
}

module.exports = Api;
