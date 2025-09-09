const InventoryRouter = require("$store/inventory/InventoryRouter");
const ProductRequest = require("../store/products/api/ProductRequest");
const UserRequest = require("$store/users/UserRequest");
const CashBoxRequest = require("$store/boxes/CashBoxRequest");
const SaleRequest = require("$store/sales/SaleRequest");
const TurnRequest = require("$store/boxes/TurnRequest");
const ClientRequest = require("$store/clients/ClientRequest");
const AuthRequest = require("$store/auth/AuthRequest");
const ConfigRequest = require("$store/config/ConfigRequest");

const MiddlewareFactory = require("./MiddlewareFactory");

class ApiRouterBuilder {
  constructor(router) {
    this.router = router;
    this.middlewareFactory = new MiddlewareFactory();
  }

  build() {
    new InventoryRouter().init(this.router);

    new ProductRequest()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new UserRequest()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new CashBoxRequest()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new SaleRequest().setupRoutes(this.router);

    new TurnRequest()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new ClientRequest()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);

    new AuthRequest()
      .setMiddlewareFactory(this.middlewareFactory)
      .setupRoutes(this.router);
    new ConfigRequest().setupRoutes(this.router);
  }
}

module.exports = ApiRouterBuilder;
