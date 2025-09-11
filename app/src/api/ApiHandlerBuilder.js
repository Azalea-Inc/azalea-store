const InventoryHandler = require("../store/inventory/InventoryHandler");
const ProductHandler = require("../store/products/api/ProductHandler");
const UserHandler = require("../store/users/UserHandler");
const CashBoxHandler = require("../store/boxes/CashBoxHandler");
const SaleHandler = require("../store/sales/SaleHandler");
const TurnHandler = require("../store/boxes/TurnHandler");
const ClientHandler = require("../store/clients/ClientHandler");
const AuthHandler = require("../store/auth/AuthHandler");
const ConfigHandler = require("../store/config/ConfigHandler");

const MiddlewareFactory = require("./MiddlewareFactory");

module.exports = class ApiHandlerBuilder {
  constructor(router) {
    this.router = router;
    this.middlewareFactory = new MiddlewareFactory();
  }

  build() {
    new InventoryHandler()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new ProductHandler()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new ProductHandler()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new UserHandler()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new CashBoxHandler()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new CashBoxHandler()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new SaleHandler()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new TurnHandler()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new ClientHandler()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new AuthHandler()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new ConfigHandler()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);
  }
};
