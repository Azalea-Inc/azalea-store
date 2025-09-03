import { writable } from "svelte/store";
import { userStore } from "@store/UserStore";

class UserEditVM {
  constructor() {
    this.store = writable(userStore.getUser());

    this.subscribe = this.store.subscribe;
    this.set = this.store.set;
    this.update = this.store.update;
  }
}

export const userEditVM = new UserEditVM();
