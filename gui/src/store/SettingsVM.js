import { writable, get } from "svelte/store";
import { notify } from "@controllers/Notify";
import http from "$lib/http";
import Spinner from "@components/Spinner.svelte";
import SettingsForm from "@components/settings/SettingsForm.svelte";
import SettingsOverview from "@components/settings/SettingsOverview.svelte";

const initialState = {
  settings: {
    store_name: "",
    currency: "",
    updated_at: "",
    currentBox: null,
    boxes: [],
  },
  component: Spinner,
};

class SettingsVM {
  constructor() {
    this.state = writable({ ...initialState });
    this.subscribe = this.state.subscribe;
  }

  goSettingsForm() {
    this.updateState({ component: SettingsForm });
  }

  getState() {
    return get(this.state);
  }

  updateState(state) {
    this.state.update((prevState) => ({ ...prevState, ...state }));
  }

  async onCreate() {
    await this.loadSettings();
  }

  async loadSettings() {
    try {
      const { data } = await http.get("/config");
      const settings = data.data;
      this.updateState({ settings, component: SettingsOverview });
    } catch (error) {
      notify.error(error);
    }
  }

  async onDestroy() {
    this.updateState({ component: Spinner });
  }

  async getBoxes() {
    try {
      const { data } = await http.get("/cashbox");
      const boxes = data.data;
      this.updateState({ boxes });
    } catch (error) {
      notify.error(error);
    }
  }

  async saveGeneralSettings() {
    try {
      await http.patch("/config", this.getState().settings);
      await this.loadSettings();
      notify.success("Ajustes guardados con éxito");
    } catch (error) {
      notify.error(error);
    }
  }
}

export const settingsVM = new SettingsVM();
