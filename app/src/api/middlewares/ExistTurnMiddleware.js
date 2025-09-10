module.exports = class AuthMiddleware {
  async execute(req, res, next) {
    const turnId = req.session?.turnId;

    if (turnId) {
      return res
        .status(400)
        .json({ error: "Turn already exists, close first" });
    }

    next();
  }
};
