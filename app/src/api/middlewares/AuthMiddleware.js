const TokenManager = require("../../common/TokenManager");
const AuthController = require("../../store/auth/AuthController");

module.exports = class AuthMiddleware {
  constructor() {
    this.tokenManager = new TokenManager();
    this.authController = new AuthController();
  }

  async execute(req, res, next) {
    try {
      const token = req.cookies?.token;
      if (!token) return res.status(401).json({ error: "Token requerido" });
      const session = await this.authController.auth(token);

      const clientId = req.cookies?.clientId;
      if (clientId) session.clientId = clientId;

      req.session = session;
      next();
    } catch (err) {
      res.clearCookie("token");
      return res.status(403).json({ error: "Token inválido o expirado" });
    }
  }
};
