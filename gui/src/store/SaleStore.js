import { writable, get } from "svelte/store";
import { sessionStore } from "@store/SessionStore";
import { SaleController } from "@controllers/SaleController";
import LoadSaleView from "@modules/sales/components/LoadSaleView.svelte";
import SaleInitView from "@modules/sales/components/SaleInitView.svelte";
import OpenTurnModal from "@modules/sales/components/OpenTurnModal.svelte";
import SaleView from "@modules/sales/components/SaleView.svelte";
import { toast } from "svelte-sonner";
import { modals } from "@components/Modals";

const sale = {
  component: null,
  cart: [],
  loading: false,
  isTurnOpen: false,
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

  async initialize() {
    this.setState({ component: LoadSaleView });

    const config = await this.getConfig();
    if (!config) {
      return;
    }

    const turn = await this.getTurn();
    if (!turn) {
      return;
    }

    this.setModalComponent(SaleView);
  }

  async getTurn() {
    try {
      const turn = await this.saleController.getTurn();
      return turn;
    } catch (error) {
      this.setModalComponent(OpenTurnModal);
    }
  }

  async getConfig() {
    try {
      const config = await this.saleController.getBoxConfig();
      return config;
    } catch (error) {
      this.setModalComponent(SaleInitView);
    }
  }

  async openTurn(turnData) {
    try {
      if (!turnData.openAmount || turnData.openAmount <= 0) {
        throw new Error("Turn data is required");
      }
      const turn = await this.saleController.openTurn(turnData);
      this.setState({ isTurnOpen: true });
      this.setModalComponent(SaleView);
      toast.success("Turno abierto exitosamente");
    } catch ({ response }) {
      toast.error(response.data);
    }
  }

  async closeTurn(closeAmount) {
    try {
      await this.saleController.closeTurn(closeAmount);
      modals.close();
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
