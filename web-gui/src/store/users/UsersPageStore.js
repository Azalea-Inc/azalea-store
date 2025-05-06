import { writable } from "svelte/store";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

class UsersPageStore {
  constructor() {
    this.store = writable(initialState);
  }

  setState(newState) {
    this.store.update((state) => ({ ...state, ...newState }));
  }

  subscribe(subscriber) {
    return this.store.subscribe(subscriber);
  }

  async addUser(user) {
    try {
      this.setState({ loading: true });
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const { data } = await response.json();
      this.setState({ users: [...this.state.users, data], loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }

  async getUsers() {
    try {
      this.setState({ loading: true });
      const response = await fetch("/api/users");
      const { data } = await response.json();
      this.setState({ users: data, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }
}

export const usersPageStore = new UsersPageStore();
