const BaseRequest = require("$api/BaseRequest");
const express = require("express");
const ProductController = require("../ProductController");
const UpdateProductHandler = require("./UpdateProductHandler");

class ProductRequest extends BaseRequest {
  constructor() {
    super();
    this.router = express.Router();
    this.controller = new ProductController();
  }

  async handleRequest(req, res, operation) {
    try {
      const result = await operation();
      res.status(result.status).json(result.data);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  async addProduct(req, res) {
    await this.handleRequest(req, res, async () => {
      const product = await this.controller.addProduct(req.body);
      return {
        status: 201,
        data: { message: "Product added successfully", product },
      };
    });
  }

  async addProducts(req, res) {
    await this.handleRequest(req, res, async () => {
      const products = await this.controller.addProducts(req.body);
      return {
        status: 201,
        data: { message: "Products added successfully", products },
      };
    });
  }

  async showProducts(req, res) {
    await this.handleRequest(req, res, async () => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const [products, total] = await Promise.all([
        this.controller.getProducts(page, limit),
        this.controller.getProductsCount(),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        status: 200,
        data: {
          message: "Products fetched successfully",
          products,
          pagination: { page, limit, total, totalPages },
        },
      };
    });
  }

  async showProductDetail(req, res) {
    await this.handleRequest(req, res, async () => {
      const product = await this.controller.showProductDetail(req.params.id);
      return {
        status: 200,
        data: {
          message: "Product fetched successfully",
          data: product,
        },
      };
    });
  }

  async deactivateProduct(req, res) {
    await this.handleRequest(req, res, async () => {
      await this.controller.deactivateProduct(req.params.id);
      return {
        status: 200,
        data: { message: "Product deactivated successfully" },
      };
    });
  }

  async activateProduct(req, res) {
    await this.handleRequest(req, res, async () => {
      await this.controller.activateProduct(req.params.id);
      return {
        status: 200,
        data: { message: "Product activated successfully" },
      };
    });
  }

  async removeProduct(req, res) {
    await this.handleRequest(req, res, async () => {
      await this.controller.removeProduct(req.params.id);
      return {
        status: 200,
        data: { message: "Product removed successfully" },
      };
    });
  }

  async updateProduct(req, res) {
    await this.handleRequest(req, res, async () => {
      await this.controller.updateProduct(req.params.id, req.body);
      return {
        status: 200,
        data: { message: "Product updated successfully" },
      };
    });
  }

  setupRoutes(router) {
    this.router.post("/", this.addProduct.bind(this));
    this.router.post("/bulk", this.addProducts.bind(this));
    this.router.get("/", this.showProducts.bind(this));
    this.router.put("/:id", this.updateProduct.bind(this));
    this.router.get("/:id", this.showProductDetail.bind(this));
    this.router.put("/:id/deactivate", this.deactivateProduct.bind(this));
    this.router.put("/:id/activate", this.activateProduct.bind(this));
    this.router.delete("/:id", this.removeProduct.bind(this));

    new UpdateProductHandler().setup(this.router);

    router.use("/products", this.applyMiddlewares(["auth"]), this.router);
  }
}

module.exports = ProductRequest;
