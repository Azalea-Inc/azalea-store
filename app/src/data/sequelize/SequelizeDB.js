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
