const Handler = require("$api/Handler");
const AuthController = require("./AuthController");

module.exports = class AuthHandler extends Handler {
  constructor() {
    super();
    this.controller = new AuthController();
  }

  async login(req, res) {
    try {
      if (req.cookies?.token) {
        const session = await this.controller.getSession(req.cookies.token);
        if (session)
          return res.status(200).json({ message: "Already logged in" });

        res.clearCookie("token");
      }

      const { email, password } = req.body;
      if (!email || !password) throw new Error("Invalid email or password");
      const token = await this.controller.login(email, password);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
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

  setupRoutes(router) {
    router.post("/login", this.login.bind(this));
    this.router.post(
      "/logout",
      this.applyMiddlewares(["existTurn"]),
      this.logout.bind(this),
    );
    this.router.get("/me", this.getUserInfo.bind(this));
    router.use("/auth", this.applyMiddlewares(["auth"]), this.router);
  }
};
