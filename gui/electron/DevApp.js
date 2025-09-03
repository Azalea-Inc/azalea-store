import { BaseApp } from "./BaseApp.js";

export class DevApp extends BaseApp {
  loadContent() {
    this.mainWindow.loadURL("http://localhost:5173");
    this.mainWindow.webContents.openDevTools();
  }
}
