const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const SequelizeDB = require("../data/sequelize/SequelizeDB");
const ApiHandlerBuilder = require("./ApiHandlerBuilder");
const { swaggerSpec, swaggerUi } = require("./swagger/swagger");

class Api {
  constructor() {
    this.app = express();
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.router = express.Router();
    this.databse = SequelizeDB.getInstance();
  }

  setupRoutes() {
    this.app.use("/api", this.router);
    new ApiHandlerBuilder(this.router).build();
  }

  async setupDatabase() {
    await SequelizeDB.connect();
  }

  async syncDatabase() {
    await SequelizeDB.sync();
  }

  async start() {
    await this.setupDatabase();
    this.setupRoutes();
    await this.syncDatabase();
    this.app.use((err, req, res, next) => {
      console.error("💥 Error capturado:", err.message);

      res.status(500).json({
        error: true,
        message: err.message,
      });
    });
    this.app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  }
}

module.exports = Api;
