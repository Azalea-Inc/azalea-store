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
    this.isSubmitted = writable(false);
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

  async togglePrinterStatus() {
    try {
      await http.patch("/config", {
        isActivePrinter: get(this.settings).isActivePrinter,
      });

      const currentStatus = get(this.settings).isActivePrinter;
      notify.info(
        !currentStatus
          ? "Impresora desactivada con éxito"
          : "Impresora activada con éxito",
      );
      await this.loadSettings();
    } catch (error) {
      notify.error(error);
    }
  }

  async saveGeneralSettings() {
    try {
      if (get(this.isSubmitted)) return;
      this.isSubmitted.set(true);
      await http.patch("/config", get(this.settings));
      await this.loadSettings();
      notify.info("Ajustes guardados con éxito");
    } catch (error) {
      notify.error(error);
    } finally {
      setTimeout(() => {
        this.isSubmitted.set(false);
      }, 1000);
    }
  }
}
