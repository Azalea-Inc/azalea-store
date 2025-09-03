import { writable, get } from "svelte/store";
import { AuthRepository } from "../repository/AuthRepository";

const User = {
  id: "",
  email: "example@example.com",
  name: "USER",
  avatar: "",
  role: "",
  status: "",
  lastLogin: "",
  createdAt: "",
  updatedAt: "",
  isLogged: false,
};

class UserStore {
  constructor() {
    this.store = writable({ ...User });
    this.subscribe = this.store.subscribe;
    this.set = this.store.set;
    this.update = this.store.update;
    this.reset = () => this.store.set({ ...User });
    this.authRepository = new AuthRepository();
  }

  setState(newState) {
    this.store.update((state) => ({ ...state, ...newState }));
  }

  setSession(session) {
    this.setState({ ...session });
  }

  getUser() {
    return get(this.store);
  }

  logued() {
    this.setState({ isLogged: true });
  }

  reset() {
    this.store.set({ ...User });
  }

  async logout() {
    await this.authRepository.logout();
    this.reset();
    window.location.href = "/";
  }
}

export const userStore = new UserStore();
