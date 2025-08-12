const { Sequelize } = require("sequelize");

class SequelizeDB {
  static #instance = null;

  constructor() {
    if (SequelizeDB.#instance) {
      return SequelizeDB.#instance;
    }

    this.sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "data/database.db",
      logging: false,
    });

    SequelizeDB.#instance = this;
    return this;
  }

  static getInstance() {
    if (!SequelizeDB.#instance) {
      SequelizeDB.#instance = new SequelizeDB();
    }
    return SequelizeDB.#instance;
  }

  static async sync() {
    try {
      await SequelizeDB.getInstance().sequelize.sync();
      const sync = require("./Sync");
      sync();
      console.log("Database synchronized successfully.");
    } catch (error) {
      console.error("Unable to synchronize the database:", error);
    }
  }

  static async drop() {
    try {
      const fs = require("fs").promises;
      const path = require("path");

      try {
        await fs.unlink(path.join("data", "database.db"));
      } catch (unlinkError) {
        if (unlinkError.code !== "ENOENT") {
          throw unlinkError;
        }
      }
      console.log("Base de datos eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar la base de datos:", error);
    }
  }

  static async connect() {
    try {
      const instance = SequelizeDB.getInstance();
      await instance.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

module.exports = SequelizeDB;
