const AuthController = require("./AuthController");

class AuthRequest {
  constructor() {
    this.controller = new AuthController();
    this.router = require("express").Router();
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new Error("Invalid email or password");
      const token = await this.controller.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async getUserInfo(req, res) {
    try {
      console.log(req.headers);
      const user = await this.controller.getUserInfo(req.headers.authorization);
      res.status(200).json({ user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    router.post("/login", this.login.bind(this));
    this.router.get("/info", this.getUserInfo.bind(this));
    router.use("/auth", this.router);
  }
}

module.exports = AuthRequest;
