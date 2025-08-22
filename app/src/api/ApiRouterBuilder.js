const InventoryRouter = require("$store/inventory/InventoryRouter");
const ProductRequest = require("$store/products/api/ProductRequest");
const UserRequest = require("$store/users/UserRequest");
const CashBoxRequest = require("$store/boxes/CashBoxRequest");
const SaleRequest = require("$store/sales/SaleRequest");
const TurnRequest = require("$store/boxes/TurnRequest");
const ClientRequest = require("$store/clients/ClientRequest");
const AuthRequest = require("$store/auth/AuthRequest");
const ConfigRequest = require("$store/config/ConfigRequest");
const AuthMiddleware = require("./AuthMiddleware");

class ApiRouterBuilder {
  constructor(router) {
    this.router = router;
    this.authMiddleware = new AuthMiddleware();
  }

  build() {
    new InventoryRouter().init(this.router);
    new ProductRequest().setupRoutes(this.router);
    new UserRequest().setupRoutes(this.router);
    new CashBoxRequest().setupRoutes(this.router);
    new SaleRequest().setupRoutes(this.router);
    new TurnRequest().setupRoutes(this.router);
    new ClientRequest().setupRoutes(this.router);
    new AuthRequest().setupRoutes(this.router);
    new ConfigRequest().setupRoutes(this.router);
  }
}

module.exports = ApiRouterBuilder;
