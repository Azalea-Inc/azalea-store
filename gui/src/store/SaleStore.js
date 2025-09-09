import { writable, get } from "svelte/store";
import { sessionStore } from "@store/SessionStore";
import { SaleController } from "@controllers/SaleController";
import LoadSaleView from "@modules/sales/components/LoadSaleView.svelte";
import SaleInitView from "@modules/sales/components/SaleInitView.svelte";
import OpenTurnModal from "@modules/sales/components/OpenTurnModal.svelte";
import { toast } from "svelte-sonner";

const sale = {
  component: null,
  cart: [],
  loading: false,
};

class SaleStore {
  constructor() {
    this.store = writable({ ...sale });
    this.subscribe = this.store.subscribe;
    this.set = this.store.set;
    this.saleController = new SaleController();
  }

  getState() {
    return get(this.store);
  }

  setState(newState) {
    this.store.update((state) => ({ ...state, ...newState }));
  }

  reset() {
    this.store.set({ ...sale });
  }

  setModalComponent(component) {
    this.setState({ component });
  }

  initialize() {
    this.setState({ component: LoadSaleView });
    return;
  }

  async getBoxConfig() {
    this.loading = true;
    try {
      await this.saleController.getBoxConfig();
      this.setModalComponent(OpenTurnModal);
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.setModalComponent(SaleInitView);
    }
  }

  async openTurn(turnData) {
    try {
      if (!turnData.openAmount || turnData.openAmount <= 0) {
        throw new Error("Turn data is required");
      }
      const turn = await this.saleController.openTurn(turnData);
      sessionStore.setTurn(turn.id);
      this.closeTurnModal();
      this.setModalComponent(CloseTurnModal);
      toast.success("Turno abierto exitosamente");
    } catch ({ response }) {
      toast.error(response.data);
    }
  }

  async closeTurn() {
    try {
      await this.saleController.closeTurn(sessionStore.getTurn(), closeAmount);
      sessionStore.closeTurn();
      this.closeTurnModal();
      this.setModalComponent(OpenTurnModal);
      this.initialize();
      toast.success("Turno cerrado exitosamente");
    } catch (error) {
      toast.error(error.message);
    }
  }

  addProduct(product) {
    this.store.update((sale) => {
      sale.cart = [product, ...sale.cart];
      return sale;
    });
  }

  removeProduct(id) {
    this.store.update((sale) => {
      sale.cart = sale.cart.filter((e) => e.id != id);
      return sale;
    });
  }
}

export const saleStore = new SaleStore();
