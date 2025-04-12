const express = require("express");

class Router {
  constructor() {
    this.router = express.Router();
  }

  #handleRequest(method, path, requestAction) {
    const [requestName, methodName] = requestAction.split("@");
    this.router[method](path, async (req, res) => {
      const requestClass = require(`./${requestName}`);
      const request = new requestClass();
      await request[methodName](req, res);
    });
  }

  #setupRoute(method) {
    return (path, requestAction) =>
      this.#handleRequest(method, path, requestAction);
  }

  get = this.#setupRoute("get");
  post = this.#setupRoute("post");
  put = this.#setupRoute("put");
  patch = this.#setupRoute("patch");
  delete = this.#setupRoute("delete");
}

module.exports = Router;
