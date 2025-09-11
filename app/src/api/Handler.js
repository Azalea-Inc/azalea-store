const BaseHandler = require("./BaseHandler");
const express = require("express");

class Handler extends BaseHandler {
  constructor() {
    super();
    this.router = express.Router();
  }
}

module.exports = Handler;
