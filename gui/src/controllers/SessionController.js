import { session } from "@store/Session";
import { AuthRepository } from "../repository/AuthRepository";

export class SessionController {
  constructor() {
    this.session = session;
    this.authRepository = new AuthRepository();
  }

  reset() {
    this.session.reset();
  }

  logued() {
    this.session.logued();
  }

  setUser(user) {
    this.session.setState(user);
  }

  getSession() {
    return this.session.getSession();
  }

  async logout() {
    await this.authRepository.logout();
    window.location.href = "/";
    this.session.reset();
  }
}
