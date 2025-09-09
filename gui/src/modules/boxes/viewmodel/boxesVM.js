import { writable } from "svelte/store";
import http from "$lib/http";

const initialState = {
  cashboxes: [],
  loading: false,
  error: null,
};

class BoxesVM {
  constructor() {
    this.store = writable(initialState);
  }

  subscribe(subscriber) {
    return this.store.subscribe(subscriber);
  }

  async addCashbox(cashbox) {
    try {
      this.store.update((state) => ({ ...state, loading: true }));
      const { data } = await http.post("/cashbox", cashbox);
      this.store.update((state) => ({
        ...state,
        cashboxes: [data.data, ...state.cashboxes],
        loading: false,
      }));
    } catch (error) {
      this.store.update((state) => ({ ...state, error, loading: false }));
    }
  }

  async getBoxes() {
    try {
      this.store.update((state) => ({ ...state, loading: true }));
      const { data } = await http.get("/cashbox");
      this.store.update((state) => ({
        ...state,
        cashboxes: data.boxes,
        loading: false,
      }));
    } catch (error) {
      this.store.update((state) => ({ ...state, error, loading: false }));
    }
  }

  async removeCashbox(id) {
    try {
      this.store.update((state) => ({ ...state, loading: true }));
      const response = await fetch(`/api/cashbox/${id}`, {
        method: "DELETE",
      });
      const { data } = await response.json();
      this.store.update((state) => ({
        ...state,
        cashboxes: state.cashboxes.filter((box) => box.id !== id),
        loading: false,
      }));
    } catch (error) {
      this.store.update((state) => ({ ...state, error, loading: false }));
    }
  }
}

export const boxesVM = new BoxesVM();
