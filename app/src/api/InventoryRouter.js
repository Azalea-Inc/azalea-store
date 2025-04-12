const Router = require("./Router");

class InventoryRouter extends Router {
  #initializeRoutes() {
    this.post("/", "InventoryRequest@addInventory");
    this.get("/", "InventoryRequest@getInventories");
    this.get("/:id", "InventoryRequest@showInventoryDetail");
    this.delete("/:id", "InventoryRequest@removeInventory");
    this.patch(
      "/:id/deactivate",
      "InventoryRequest@deactivateProductToInventory",
    );
    this.patch("/:id/activate", "InventoryRequest@activateProductToInventory");
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
