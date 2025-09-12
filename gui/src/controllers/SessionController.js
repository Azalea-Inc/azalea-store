import { sessionStore } from "@store/Session";
import { notify } from "@controllers/Notify";
import { AuthRepository } from "../repository/AuthRepository";
import { get } from "svelte/store";

export class SessionController {
  constructor() {
    this.sessionStore = sessionStore;
    this.authRepository = new AuthRepository();
  }

  reset() {
    this.sessionStore.reset();
  }

  logued() {
    this.sessionStore.logued();
  }

  setUser(user) {
    this.sessionStore.setState(user);
  }

  getSession() {
    return this.sessionStore.getSession();
  }

  async logout() {
    try {
      await this.authRepository.logout();
      this.sessionStore.reset();
    } catch (error) {
      throw error;
    }
  }
}
