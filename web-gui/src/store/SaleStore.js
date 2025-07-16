import { writable, get } from "svelte/store";
import { sessionStore } from "@store/SessionStore";
import { SaleController } from "@controllers/SaleController";
import OpenTurnModal from "@components/sales/OpenTurnModal.svelte";
import CloseTurnModal from "@components/sales/CloseTurnModal.svelte";
import { toast } from "svelte-sonner";

const sale = {
  turnModal: {
    isOpen: false,
    component: OpenTurnModal,
  },
  cart: [],
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
    this.setState({
      turnModal: { ...this.getState().turnModal, component },
    });
  }

  closeTurnModal() {
    this.setState({
      turnModal: { ...this.getState().turnModal, isOpen: false },
    });
  }

  openTurnModal() {
    this.setState({
      turnModal: { ...this.getState().turnModal, isOpen: true },
    });
  }

  initialize() {
    const turnId = sessionStore.initialize();
    if (!turnId) {
      this.setModalComponent(OpenTurnModal);
      this.openTurnModal();
      return;
    }
    this.closeTurnModal();
    this.setModalComponent(CloseTurnModal);
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
    } catch (error) {
      console.error(error.message);
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
      console.error(error.message);
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
