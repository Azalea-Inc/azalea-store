import { writable, get } from "svelte/store";
import { notify } from "@controllers/Notify";
import http from "$lib/http";

const settings = {
  store_name: "",
  currency: "",
  updated_at: "",
  isActivePrinter: false,
};

export class SettingsVM {
  constructor() {
    this.settings = writable({ ...settings });
  }

  async onCreate() {
    await this.loadSettings();
  }

  async loadSettings() {
    try {
      const { data } = await http.get("/config");
      const settings = data.data;
      this.settings.set(settings);
    } catch (error) {
      notify.error(error);
    }
  }

  async saveGeneralSettings() {
    try {
      await http.patch("/config", get(this.settings));
      await this.loadSettings();
      notify.success("Ajustes guardados con éxito");
    } catch (error) {
      notify.error(error);
    }
  }
}
