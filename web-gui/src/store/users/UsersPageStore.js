import { writable } from "svelte/store";
import { bus } from "$lib/EventBus";
import { toast } from "svelte-sonner";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

class UsersPageVM {
  constructor() {
    this.store = writable(initialState);
    this.events = [];
  }

  setState(newState) {
    this.store.update((state) => ({ ...state, ...newState }));
  }

  subscribe(subscriber) {
    return this.store.subscribe(subscriber);
  }

  onMount(callback) {
    this.events.push(
      bus.on("user-removed", ({ detail }) => {
        this.removeUser(detail);
      }),
    );

    this.events.push(
      bus.on("user-added", (e) => {
        this.getUsers();
      }),
    );
  }

  onDestroy(callback) {
    this.events.forEach((event) => event());
    this.events = [];
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
      this.store.update((state) => ({
        ...state,
        loading: false,
      }));
      toast.success("Usuario agregado exitosamente");
    } catch (error) {
      this.setState({ error, loading: false });
      toast.error("Error al agregar usuario");
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

  async removeUser(id) {
    try {
      this.setState({ loading: true });
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      this.store.update((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: false,
      }));
      toast.success("Usuario eliminado exitosamente");
    } catch (error) {
      this.setState({ error, loading: false });
      toast.error("Error al eliminar usuario");
    }
  }
}

export const usersPageStore = new UsersPageVM();
