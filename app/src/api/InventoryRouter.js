const Router = require("./Router");
const InventoryRequest = require("./InventoryRequest");

class InventoryRouter extends Router {
  constructor() {
    super();
  }

  #initializeRoutes() {
    const request = new InventoryRequest();
    this.router.post("/", request.addInventory.bind(request));
    this.router.get("/", request.getInventories.bind(request));
    this.router.get("/:id", request.showInventoryDetail.bind(request));
    this.router.post(
      "/:id/movement",
      request.addMovementToInventory.bind(request),
    );
    this.router.get("/movements/:id", request.showMovementDetail.bind(request));
    this.router.get(
      "/:id/movements",
      request.showMovementsToInventory.bind(request),
    );
    this.router.delete("/:id", request.removeInventory.bind(request));
    this.router.patch(
      "/:id/deactivate",
      request.deactivateProductToInventory.bind(request),
    );
    this.router.patch(
      "/:id/activate",
      request.activateProductToInventory.bind(request),
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
