import { writable, get } from "svelte/store";

const User = {
  id: "usr_123456789",
  email: "usuario@ejemplo.com",
  name: "Joan Coronado",
  avatar: "https://avatars.githubusercontent.com/u/42311777?v=4&size=64",
  role: "administrador",
  permissions: ["read", "write", "delete", "manage_users"],
  status: "activo",
  lastLogin: "2023-05-15T14:30:45Z",
  createdAt: "2022-01-10T09:20:33Z",
  updatedAt: "2023-05-15T14:30:45Z",
  isLogged: false,
};

class UserStore {
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

  getUser() {
    return get(this.store);
  }

  logued() {
    this.setState({ isLogged: true });
  }
}

export const userStore = new UserStore();
