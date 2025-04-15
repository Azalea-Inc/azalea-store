const Router = require("./Router");
const InventoryRequest = require("./InventoryRequest");

class InventoryRouter extends Router {
  constructor() {
    super();
    this.request = new InventoryRequest();
  }

  #initializeRoutes() {
    this.post("/", this.request.addInventory.bind(this.request));
    this.get("/", this.request.getInventories.bind(this.request));
    this.get("/:id", this.request.showInventoryDetail.bind(this.request));
    this.delete("/:id", this.request.removeInventory.bind(this.request));
    this.patch(
      "/:id/deactivate",
      this.request.deactivateProductToInventory.bind(this.request),
    );
    this.patch(
      "/:id/activate",
      this.request.activateProductToInventory.bind(this.request),
    );
  }

  #setupRouterMiddleware(router) {
    router.use("/inventory", this.router);
  }

  init(router) {
    this.#initializeRoutes();
    this.#setupRouterMiddleware(router);
  }
}

module.exports = InventoryRouter;
