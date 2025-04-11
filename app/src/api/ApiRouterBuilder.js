const InventoryRequest = require("./InventoryRequest");
const ProductRequest = require("./ProductRequest");
const UserRequest = require("./UserRequest");
const CashBoxRequest = require("./cashBox/CashBoxRequest");
const SaleRequest = require("./sales/SaleRequest");

class ApiRouterBuilder {
  constructor(router) {
    this.router = router;
  }

  build() {
    new InventoryRequest().setupRoutes(this.router);
    new ProductRequest().setupRoutes(this.router);
    new UserRequest().setupRoutes(this.router);
    new CashBoxRequest().setupRoutes(this.router);
    new SaleRequest().setupRoutes(this.router);
  }
}

module.exports = ApiRouterBuilder;
