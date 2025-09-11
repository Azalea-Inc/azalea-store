const Api = require("./api/Api");
const ConfigController = require("$store/config/ConfigController");

module.exports = class Store {
  constructor() {
    this.api = new Api();
    this.configController = new ConfigController();
  }

  async start() {
    try {
      await this.api.start();
      await this.configController.init();
    } catch (error) {
      console.error("Error initializing config:", error);
      process.exit(1);
    }
  }
};
