import { writable } from "svelte/store";

const initialState = {
  cashboxes: [],
  loading: false,
  error: null,
};

class CashboxesPageStore {
  constructor() {
    this.store = writable(initialState);
  }

  subscribe(subscriber) {
    return this.store.subscribe(subscriber);
  }

  async addCashbox(cashbox) {
    try {
      this.store.update((state) => ({ ...state, loading: true }));
      const response = await fetch("/api/cashbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cashbox),
      });
      const { data } = await response.json();
      this.store.update((state) => ({
        ...state,
        cashboxes: [...state.cashboxes, data],
        loading: false,
      }));
    } catch (error) {
      this.store.update((state) => ({ ...state, error, loading: false }));
    }
  }

  async getBoxes() {
    try {
      this.store.update((state) => ({ ...state, loading: true }));
      const response = await fetch("/api/cashbox");
      const { data } = await response.json();
      this.store.update((state) => ({
        ...state,
        cashboxes: data,
        loading: false,
      }));
    } catch (error) {
      this.store.update((state) => ({ ...state, error, loading: false }));
    }
  }
}

export const cashboxesPageStore = new CashboxesPageStore();
