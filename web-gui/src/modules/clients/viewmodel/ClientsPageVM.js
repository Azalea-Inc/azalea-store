import { writable, get } from "svelte/store";
import { toast } from "svelte-sonner";
import { bus } from "$lib/EventBus";
import http from "$lib/http";

const initialState = {
  clients: [],
  loading: false,
  error: null,
};

class ClientsPageVM {
  constructor() {
    this.store = writable(initialState);
    this.events = [];
  }

  setState(newState) {
    this.store.update((state) => ({ ...state, ...newState }));
  }

  getState() {
    return get(store);
  }

  subscribe(subscriber) {
    return this.store.subscribe(subscriber);
  }

  onMount() {
    this.events.push(
      bus.on("client-removed", ({ detail }) => {
        this.removeClient(detail);
      }),
    );
  }

  onDestroy() {
    this.events.forEach((e) => e());
    this.events = [];
  }

  async addClient(client) {
    try {
      this.setState({ loading: true });
      await http.post("/clients", client);
      toast.success("Cliente agregado exitosamente");
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
      this.setState({ error, loading: false });
    }
  }

  async getClients() {
    try {
      this.setState({ loading: true });
      const { data } = await http.get("/clients");
      this.setState({ clients: data.data, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }

  async removeClient(id) {
    try {
      await http.delete(`/clients/${id}`);
      this.store.update((state) => ({
        clients: state.clients.filter((client) => client.id !== id),
        loading: false,
      }));
      toast.success("Cliente eliminado exitosamente");
    } catch (error) {
      toast.error(error.response.data.error);
      this.setState({ error, loading: false });
    }
  }
}

export const clientsPageVM = new ClientsPageVM();
