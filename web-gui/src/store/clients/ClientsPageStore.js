import { writable } from "svelte/store";

const initialState = {
  clients: [],
  loading: false,
  error: null,
};

class ClientsPageStore {
  constructor() {
    this.store = writable(initialState);
  }

  setState(newState) {
    this.store.update((state) => ({ ...state, ...newState }));
  }

  subscribe(subscriber) {
    return this.store.subscribe(subscriber);
  }

  async addClient(client) {
    try {
      this.setState({ loading: true });
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
      });

      console.log(response);
      const { data } = await response.json();
      this.setState({ clients: [...this.state.clients, data], loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }

  async getClients() {
    try {
      this.setState({ loading: true });
      const response = await fetch("/api/clients");
      const { data } = await response.json();
      this.setState({ clients: data, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }

  async removeClient(id) {
    try {
      // await fetch(`/api/clients/${id}`, { method: "DELETE" });
      this.store.update((state) => ({
        clients: state.clients.filter((client) => client.id !== id),
        loading: false,
      }));
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }
}

export const clientsPageStore = new ClientsPageStore();
