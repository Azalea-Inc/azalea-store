import InError from "@components/products/InError.svelte";
import InSuccess from "@components/products/InSuccess.svelte";
import ProductSearchList from "@components/products/ProductSearchList.svelte";
import { productDetailStore } from "@store/products/ProductDetailStore";
import { writable } from "svelte/store";

class ProductsPageStore {
  constructor() {
    this.products = [];
    this.currentPage = InSuccess;
    this.errorMessage = "Error loading products";
    this.page = 1;
    this.limit = 50;
    this.total = 0;
    this.totalPages = 0;
    this.inLoading = true;
    this.host = "http://localhost:3000";
    this.store = writable(this);
  }

  resetState() {
    this.products = [];
    this.currentPage = InSuccess;
    this.page = 1;
    this.limit = 10;
    this.total = 0;
    this.totalPages = 0;
    this.inLoading = true;
    this.update();
  }

  subscribe(run) {
    return this.store.subscribe(run);
  }

  set(value) {
    return this.store.set(value);
  }

  update() {
    this.set(this);
  }

  updateProduct(id, data) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...data };
      this.update();
    }
  }

  openProductDetail(id) {
    productDetailStore.openProductDetail(id);
  }

  async getProducts() {
    try {
      this.inLoading = true;
      const response = await fetch(
        `${this.host}/api/products?page=${this.page}&limit=${this.limit}`,
      );
      const { data, pagination } = await response.json();
      this.products = data;
      this.total = pagination.total;
      this.totalPages = pagination.totalPages;

      setTimeout(() => {
        this.inLoading = false;
        this.update();
      }, 150);
    } catch (error) {
      this.inLoading = false;
      this.errorMessage = error.message;
      this.currentPage = InError;
      this.update();
    }
  }
}

export const productsPageStore = new ProductsPageStore();
