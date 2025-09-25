import InError from "@modules/products/components/InError.svelte";
import InSuccess from "@modules/products/components/InSuccess.svelte";
import ProductSearchList from "@modules/products/components/ProductSearchList.svelte";
import { productDetailStore } from "@modules/products/viewmodel/ProductDetailStore";
import { writable } from "svelte/store";
import { toast } from "svelte-sonner";
import { modals } from "@components/Modals";
import ConfirmModal from "@components/Modals/ConfirmModal.svelte";
import AddProductModal from "@modules/products/components/AddProductModal.svelte";
import EditProductModal from "@modules/products/components/EditProductModal.svelte";

import { ProductRepository } from "../ProductRepository";

class ProductsPageStore {
  constructor() {
    this.products = [];
    this.currentPage = InSuccess;
    this.errorMessage = "Error loading products";
    this.total = 0;
    this.inLoading = true;
    this.store = writable(this);
    this.repository = new ProductRepository();
  }

  resetState() {
    this.products = [];
    this.currentPage = InSuccess;
    this.total = 0;
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

  addProductHandler(data) {
    modals.push(AddProductModal, {
      title: "Agregar Producto",
    });
  }

  deleteProductHandler(id) {
    modals.warning({
      title: "Eliminar Producto",
      message: "¿Estás seguro de que deseas eliminar este producto?",
      onConfirm: () => {
        this.deleteProduct(id);
      },
    });
  }

  editProductHandler(product) {
    modals.push(EditProductModal, {
      title: "Editar Producto",
      product,
    });
  }

  async deleteProduct(id) {
    try {
      await this.repository.deleteProduct(id);
      toast.info("Producto eliminado exitosamente");
      this.products = this.products.filter((product) => product.id !== id);
      this.update();
    } catch (error) {
      this.errorMessage = error.message;
      this.currentPage = InError;
      this.update();
    }
  }

  async getProducts(page = 0, limit = 50) {
    try {
      this.inLoading = true;
      const { products, pagination } = await this.repository.getProducts(
        page,
        limit,
      );
      this.products = products;
      this.total = pagination.total;
      this.inLoading = false;
      this.update();
    } catch (error) {
      this.inLoading = false;
      this.errorMessage = error.message;
      this.currentPage = InError;
      this.update();
    }
  }
}

export const productsPageStore = new ProductsPageStore();
