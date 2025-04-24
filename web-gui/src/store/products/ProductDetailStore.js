import { writable } from "svelte/store";

const initialState = writable({
  id: null,
  name: "",
  description: "",
  price: 0,
  quantity: 0,
  image: "",
  updatedAt: null,

  isLoading: true,
  isOpen: false,
});

class ProductDetailStore {
  constructor() {
    this.store = initialState;
  }

  subscribe(subscriber) {
    return this.store.subscribe(subscriber);
  }

  reset() {
    this.store.set(initialState);
  }

  #update(args) {
    this.store.update((state) => ({ ...state, ...args }));
  }

  async fetchProductInfo(id) {
    this.#update({ isLoading: true });
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    const { data } = await response.json();

    setTimeout(() => {
      this.#update({ ...data, isLoading: false });
    }, 200);
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
