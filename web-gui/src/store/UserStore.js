import { writable, get } from "svelte/store";

class User {
  constructor() {
    this.id = "usr_123456789";
    this.email = "usuario@ejemplo.com";
    this.name = "María García";
    this.avatar =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuHyxPK2yeehZRCtrNt-LzzQKQ5sDRLeBqGQ&s";
    this.role = "administrador";
    this.permissions = ["read", "write", "delete", "manage_users"];
    this.status = "activo";
    this.lastLogin = "2023-05-15T14:30:45Z";
    this.createdAt = "2022-01-10T09:20:33Z";
    this.updatedAt = "2023-05-15T14:30:45Z";
  }
}

class UserStore {
  constructor() {
    this.store = writable(new User());
    this.subscribe = this.store.subscribe;
    this.set = this.store.set;
    this.update = this.store.update;
    this.reset = () => this.store.set(new User());
  }

  getUser() {
    return get(this.store);
  }
}

export const userStore = new UserStore();
