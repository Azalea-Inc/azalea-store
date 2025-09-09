const AuthMiddleware = require("./middlewares/AuthMiddleware");

module.exports = class MiddlewareFactory {
  constructor() {
    this.middlewares = {
      auth: new AuthMiddleware(),
    };
  }

  get(name) {
    return this.middlewares[name];
  }
};
