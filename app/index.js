const Api = require("./src/api/Api");
const ConfigController = require("./src/controllers/ConfigController");

class App {
  constructor() {
    this.api = new Api();
    this.configController = new ConfigController();
  }

  async start() {
    try {
      await this.configController.init();
      this.api.start();
    } catch (error) {
      console.error("Error initializing config:", error);
      process.exit(1);
    }
  }
}

const app = new App();
app.start();
