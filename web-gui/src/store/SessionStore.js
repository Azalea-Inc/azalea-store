import { writable, get } from "svelte/store";
import { saleStore } from "@store/SaleStore";

const initialState = {
  userId: null,
  cashBoxId: "0b733db2-3a78-4a01-9205-d1f5253e1aca",
  turnId: null,
  currentSaleId: null,
  isTurnActive: false,
  isSaleActive: false,
  recentSales: [],
};

class SessionStore {
  constructor() {
    this.store = writable({ ...initialState });
    this.subscribe = this.store.subscribe;
    this.set = this.store.set;
    this.update = this.store.update;
    this.reset = () => this.store.set({ ...initialState });
  }

  getState() {
    return get(this.store);
  }

  setState(newState) {
    this.store.update((state) => ({ ...state, ...newState }));
  }

  initialize() {
    const turnId = localStorage.getItem("turnId");
    if (!turnId) {
      this.setState({ isTurnActive: false });
      return;
    }
    console.log(turnId);
    this.setState({ turnId, isTurnActive: true });
    return turnId;
  }

  setTurn(turnId) {
    localStorage.setItem("turnId", turnId);
    this.setState({ turnId, isTurnActive: true });
  }

  closeTurn() {
    localStorage.removeItem("turnId");
    this.setState({ turnId: null, isTurnActive: false });
  }

  getTurn() {
    return this.getState().turnId;
  }

  createSale() {
    const saleId = "123456";
    this.setState({ currentSaleId: saleId, isSaleActive: true });
    return saleId;
  }

  cancelSale() {
    this.setState({ currentSaleId: null, isSaleActive: false });
  }
}

export const sessionStore = new SessionStore();
