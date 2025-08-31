const AuthController = require("./AuthController");

class AuthRequest {
  constructor() {
    this.controller = new AuthController();
    this.router = require("express").Router();
  }

  async login(req, res) {
    try {
      if (req.cookies?.token) {
        const session = await this.controller.getSession(req.cookies.token);
        if (session)
          return res.status(200).json({ message: "Already logged in" });

        res.clearCookie("token");
        return res.status(401).json({ error: "Invalid session" });
      }

      const { email, password } = req.body;
      if (!email || !password) throw new Error("Invalid email or password");
      const token = await this.controller.login(email, password);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
      });

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserInfo(req, res) {
    try {
      const user = await this.controller.getUserInfo(req.session.userId);
      res.status(200).json({ user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      await this.controller.logout(req.session.tokenId);
      res.clearCookie("token");
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  setMiddlewares(authMiddleware) {
    this.authMiddleware = authMiddleware;
    return this;
  }

  setupRoutes(router) {
    router.post("/login", this.login.bind(this));
    this.router.post("/logout", this.logout.bind(this));
    this.router.get("/me", this.getUserInfo.bind(this));
    router.use(
      "/auth",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.router,
    );
  }
}

module.exports = AuthRequest;
