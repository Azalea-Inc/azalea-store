const UpdateProductController = require("../../controllers/products/UpdateProductController");

class UpdateProductHandler {
  #controller;

  constructor() {
    this.#controller = new UpdateProductController();
  }

  async #handleRequest(req, res, operation) {
    try {
      const result = await operation();
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updatePrice(req, res) {
    await this.#handleRequest(req, res, async () => {
      await this.#controller.updatePrice(req.params.id, req.body.price);
      return {
        status: 200,
        data: { message: "Product price updated successfully" },
      };
    });
  }

  setup(router) {
    router.put("/:id/price", this.updatePrice.bind(this));
  }
}

module.exports = UpdateProductHandler;
