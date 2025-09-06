import { writable, get } from "svelte/store";
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

class Session {
  constructor() {
    this.store = writable({ ...User });
    this.subscribe = this.store.subscribe;
    this.set = this.store.set;
    this.update = this.store.update;
    this.reset = () => this.store.set({ ...User });
  }

  setState(newState) {
    this.store.update((state) => ({ ...state, ...newState }));
  }

  setSession(session) {
    this.setState({ ...session });
  }

  getSession() {
    return get(this.store);
  }

  logued() {
    this.setState({ isLogged: true });
  }

  reset() {
    this.store.set({ ...User });
  }
}

export const session = new Session();
