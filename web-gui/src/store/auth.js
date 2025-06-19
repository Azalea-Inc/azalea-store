const auth = {
  userId: null,
  role: null,
};

class AuthStore {
  constructor() {
    this.store = writable();
  }
}

export const authStore = new AuthStore();
