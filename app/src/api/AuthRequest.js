const AuthController = require("../controllers/AuthController");

class AuthRequest {
  constructor() {
    this.controller = new AuthController();
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const user = await this.controller.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  setupRoutes(router) {
    router.post("/login", this.login.bind(this));
  }
}

module.exports = AuthRequest;
