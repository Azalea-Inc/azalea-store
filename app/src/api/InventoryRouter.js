const Router = require("./Router");
const InventoryRequest = require("./InventoryRequest");

class InventoryRouter extends Router {
  constructor() {
    super();
    this.request = new InventoryRequest();
  }

  #initializeRoutes() {
    this.router.post("/", this.request.addInventory.bind(this.request));
    this.router.get("/", this.request.getInventories.bind(this.request));
    this.router.get(
      "/:id",
      this.request.showInventoryDetail.bind(this.request),
    );
    this.router.delete("/:id", this.request.removeInventory.bind(this.request));
    this.router.patch(
      "/:id/deactivate",
      this.request.deactivateProductToInventory.bind(this.request),
    );
    this.router.patch(
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
