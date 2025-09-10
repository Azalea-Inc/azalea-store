const AuthMiddleware = require("./middlewares/AuthMiddleware");
const ExistTurnMiddleware = require("./middlewares/ExistTurnMiddleware");

module.exports = class MiddlewareFactory {
  constructor() {
    this.middlewares = {
      auth: new AuthMiddleware(),
      existTurn: new ExistTurnMiddleware(),
    };
  }

  get(name) {
    return this.middlewares[name];
  }
};
