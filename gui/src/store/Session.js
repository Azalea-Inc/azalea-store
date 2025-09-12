import { writable, get } from "svelte/store";

const session = {
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

class SessionStore {
  constructor() {
    this.session = writable({ ...session });
  }

  reset() {
    this.session.set({ ...session });
  }

  setState(newState) {
    this.session.update((state) => ({ ...state, ...newState }));
  }

  getSession() {
    return get(this.session);
  }

  setSession(session) {
    this.setState({ ...session });
  }

  logued() {
    this.setState({ isLogged: true });
  }
}

export const sessionStore = new SessionStore();
