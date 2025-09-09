const BaseRequest = require("./BaseRequest");
const express = require("express");

class Router extends BaseRequest {
  constructor() {
    super();
    this.router = express.Router();
  }
}

module.exports = Router;
