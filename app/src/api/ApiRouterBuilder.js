const InventoryRouter = require("./InventoryRouter");
const ProductRequest = require("./ProductRequest");
const UserRequest = require("./UserRequest");
const CashBoxRequest = require("./cashBox/CashBoxRequest");
const SaleRequest = require("./sales/SaleRequest");
const RegistryRequest = require("./RegistryRequest");
const ClientRequest = require("./ClientRequest");
const AuthRequest = require("./AuthRequest");
const ConfigRequest = require("./ConfigRequest");

class ApiRouterBuilder {
  constructor(router) {
    this.router = router;
  }

  build() {
    new InventoryRouter().init(this.router);
    new ProductRequest().setupRoutes(this.router);
    new UserRequest().setupRoutes(this.router);
    new CashBoxRequest().setupRoutes(this.router);
    new SaleRequest().setupRoutes(this.router);
    new RegistryRequest().setupRoutes(this.router);
    new ClientRequest().setupRoutes(this.router);
    new AuthRequest().setupRoutes(this.router);
    new ConfigRequest().setupRoutes(this.router);
  }
}

module.exports = ApiRouterBuilder;
