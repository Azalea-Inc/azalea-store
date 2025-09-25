const Handler = require("../../api/Handler");
const SaleController = require("./SaleController");

module.exports = class SaleHandler extends Handler {
  constructor() {
    super();
    this.controller = new SaleController();
  }

  async createSale(req, res) {
    try {
      const sale = await this.controller.createSale(req.session);
      res
        .status(201)
        .json({ message: "Sale created successfully", data: sale });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showSale(req, res) {
    try {
      const sale = await this.controller.showSale(req.params.id);
      res
        .status(200)
        .json({ message: "Sale retrieved successfully", data: sale });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async addProduct(req, res) {
    try {
      const sale = await this.controller.addProduct(req.params.id, req.body);
      res
        .status(200)
        .json({ message: "Add Product retrieved successfully", data: sale });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showProductsForSale(req, res) {
    try {
      const products = await this.controller.showProductsForSale(req.params.id);
      res
        .status(200)
        .json({ message: "Products retrieved successfully", data: products });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showSales(req, res) {
    try {
      const sales = await this.controller.showSales();
      res.status(200).json({ message: "Sales retrieved successfully", sales });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async showSalesByTurn(req, res) {
    try {
      const sales = await this.controller.showSalesByTurn(req.session?.turnId);
      res.status(200).json({ message: "Sales retrieved successfully", sales });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async printTicket(req, res) {
    try {
      await this.controller.printTicket(req.params.id);
      res.status(200).json({ message: "Ticket retrieved successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeSale(req, res) {
    try {
      const sale = await this.controller.removeSale(req.params.id);
      res
        .status(200)
        .json({ message: "Sale removed successfully", data: sale });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getBoxConfig(req, res) {
    try {
      const clientId = req.cookies?.clientId;
      if (!clientId) {
        throw new Error("Client ID not found");
      }

      const boxConfig = await this.controller.getBoxConfig(clientId);

      if (!boxConfig) {
        throw new Error("Box configuration not found");
      }

      res.status(200).json({
        message: "Box configuration retrieved successfully",
        boxConfig,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    this.router.post("/", this.createSale.bind(this));
    this.router.get("/:id", this.showSale.bind(this));
    this.router.get("/", this.showSales.bind(this));
    this.router.get("/turn/all", this.showSalesByTurn.bind(this));
    this.router.post("/:id/print", this.printTicket.bind(this));
    this.router.delete("/:id", this.removeSale.bind(this));
    this.router.post("/:id/products", this.addProduct.bind(this));
    this.router.get("/:id/products", this.showProductsForSale.bind(this));
    this.router.get("/box/config", this.getBoxConfig.bind(this));

    router.use("/sales", this.applyMiddlewares(["auth"]), this.router);
  }
};
