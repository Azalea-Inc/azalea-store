import { writable, get } from "svelte/store";
import { toast } from "svelte-sonner";

const initialState = {
  storeName: localStorage.getItem("storeName") || "Azalea",
};

class SettingsStore {
  constructor() {
    this.state = writable({ ...initialState });
    this.subscribe = this.state.subscribe;
    this.set = this.state.set;
  }

  getState = () => {
    return get(this.state);
  };

  saveGeneralSettings = async () => {
    const { storeName } = this.getState();
    localStorage.setItem("storeName", storeName);
    toast.success("Ajustes guardados con éxito");
  };
}

export const settingsStore = new SettingsStore();
