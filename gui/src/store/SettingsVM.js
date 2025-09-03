import { writable, get } from "svelte/store";
import { notify } from "@controllers/Notify";
import http from "$lib/http";
import Spinner from "@components/Spinner.svelte";
import SettingsForm from "@components/settings/SettingsForm.svelte";

const initialState = {
  settings: {
    store_name: "",
    currency: "",
    updated_at: "",
  },
  component: Spinner,
};

class SettingsVM {
  constructor() {
    this.state = writable({ ...initialState });
    this.subscribe = this.state.subscribe;
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
      this.updateState({ settings, component: SettingsForm });
    } catch (error) {
      notify.error(error);
    }
  }

  async onDestroy() {
    this.updateState({ component: Spinner });
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
