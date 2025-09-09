module.exports = class BaseRequest {
  setMiddlewareFactory(middlewareFactory) {
    this.middlewareFactory = middlewareFactory;
    return this;
  }

  applyMiddlewares(names) {
    return names.map((name) =>
      this.middlewareFactory
        .get(name)
        .execute.bind(this.middlewareFactory.get(name)),
    );
  }
};
