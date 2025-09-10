import { session } from "@store/Session";
import { AuthRepository } from "../repository/AuthRepository";
import { notify } from "@controllers/Notify";

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
    try {
      await this.authRepository.logout();
      window.location.href = "/";
      this.session.reset();
    } catch (error) {
      notify.error(
        "Error al cerrar sesión asegurese de cerrar el turno abierto",
      );
    }
  }
}
