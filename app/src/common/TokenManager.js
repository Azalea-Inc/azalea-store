const jwt = require("jsonwebtoken");

module.exports = class TokenManager {
  constructor(secretKey) {
    this.secretKey = secretKey || "default-secret-key";
  }

  generateToken(session) {
    const payload = {
      userId: session.userId,
      tokenId: session.tokenId,
    };

    return jwt.sign(payload, this.secretKey, {
      expiresIn: "24h",
      algorithm: "HS256",
    });
  }

  validateToken(token) {
    try {
      if (!token) {
        return { valid: false, error: "Token not provided" };
      }

      const payload = jwt.verify(token, this.secretKey, {
        ignoreExpiration: true,
      });
      return { valid: true, payload };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return { valid: false, error: "Token expired" };
      } else if (error.name === "JsonWebTokenError") {
        return { valid: false, error: "Invalid signature" };
      } else {
        return { valid: false, error: "Token validation failed" };
      }
    }
  }
};
