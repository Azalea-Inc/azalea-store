const jwt = require("jsonwebtoken");

module.exports = class TokenManager {
  constructor(secretKey) {
    this.secretKey = secretKey || "default-secret-key";
  }

  generateToken(userInfo) {
    const payload = {
      userId: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
    };

    return jwt.sign(payload, this.secretKey, {
      expiresIn: "24h",
      algorithm: "HS256",
    });
  }

  generateAccessToken(userInfo, expiresIn = "1h") {
    const payload = {
      userId: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      role: userInfo.role,
      type: "access",
    };

    return jwt.sign(payload, this.secretKey, {
      expiresIn,
      algorithm: "HS256",
    });
  }

  generateRefreshToken(userInfo, expiresIn = "7d") {
    const payload = {
      userId: userInfo.id,
      type: "refresh",
    };

    return jwt.sign(payload, this.secretKey, {
      expiresIn,
      algorithm: "HS256",
    });
  }

  validateToken(token) {
    try {
      if (!token) {
        return { valid: false, error: "Token not provided" };
      }

      const payload = jwt.verify(token, this.secretKey);
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

  getUserInfo(token) {
    try {
      const payload = jwt.verify(token, this.secretKey);
      return { valid: true, payload };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token expired");
      } else if (error.name === "JsonWebTokenError") {
        throw new Error("Invalid signature");
      } else {
        throw new Error("Token validation failed");
      }
    }
  }
};
