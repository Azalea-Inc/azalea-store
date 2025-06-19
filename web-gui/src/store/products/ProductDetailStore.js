import { writable } from "svelte/store";
import { productsPageStore } from "@store/pages/ProductsPageStore";

const API_URL = "http://localhost:3000/api/products";

const createInitialState = () => ({
  id: null,
  name: "",
  description: "",
  price: 0,
  quantity: 0,
  image: "",
  updatedAt: null,
  isActive: true,
  processMessage: "Cargando...",
  isLoading: true,
  isOpen: false,
});

const initialState = writable(createInitialState());

class ProductDetailStore {
  constructor() {
    this.store = initialState;
  }

  subscribe(subscriber) {
    return this.store.subscribe(subscriber);
  }

  reset() {
    this.store.set(createInitialState());
  }

  #update(args) {
    this.store.update((state) => ({ ...state, ...args }));
  }

  #setLoadingState(isLoading, message = "") {
    const updates = { isLoading };
    if (message) {
      updates.processMessage = message;
    }
    this.#update(updates);
  }

  async #toggleActivation(id, activate) {
    const action = activate ? "activate" : "deactivate";
    const message = activate ? "Activando..." : "Desactivando...";

    this.#setLoadingState(true, message);

    await fetch(`${API_URL}/${id}/${action}`, {
      method: "PUT",
    });

    this.#setLoadingState(false);
    productsPageStore.updateProduct(id, { isActive: activate });
    this.#update({ isActive: activate });
  }

  async deactivate(id) {
    await this.#toggleActivation(id, false);
  }

  async activate(id) {
    await this.#toggleActivation(id, true);
  }

  async fetchProductInfo(id) {
    this.#setLoadingState(true);
    const response = await fetch(`${API_URL}/${id}`);
    const { data } = await response.json();
    this.#update({ ...data, isLoading: false });
  }

  close() {
    this.reset();
  }

  openProductDetail(id) {
    this.fetchProductInfo(id);
    this.#update({
      id,
      isOpen: true,
    });
  }
}

export const productDetailStore = new ProductDetailStore();
