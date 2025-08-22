const TokenManager = require("../common/TokenManager");

module.exports = class AuthMiddleware {
  constructor() {
    this.tokenManager = new TokenManager();
  }

  authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "Token requerido" });

    const token = authHeader.split(" ")[1]; // formato "Bearer <token>"
    if (!token) return res.status(401).json({ error: "Token faltante" });

    try {
      const decoded = this.tokenManager.getUserInfo(token);
      req.session = decoded; // guardar datos del usuario en la request
      next();
    } catch (err) {
      return res.status(403).json({ error: "Token inválido o expirado" });
    }
  }
};
