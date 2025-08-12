const AuthController = require("./AuthController");

class AuthRequest {
  constructor() {
    this.controller = new AuthController();
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

  setupRoutes(router) {
    router.post("/login", this.login.bind(this));
  }
}

module.exports = AuthRequest;
