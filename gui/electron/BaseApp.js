import { app, BrowserWindow, screen } from "electron";

export class BaseApp {
  constructor() {
    this.mainWindow = null;
  }

  createWindow(options = {}) {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    this.mainWindow = new BrowserWindow({
      width: width,
      height: height,
      title: "Azalea Store",
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        partition: "persist:app-session",
      },
      minWidth: 800,
      minHeight: 800,
      ...options,
    });

    this.loadContent();
    this.mainWindow.on("closed", () => {
      this.mainWindow = null;
    });
  }

  loadContent() {
    throw new Error("loadContent not implemented");
  }

  run() {
    app.on("ready", () => this.createWindow());

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") app.quit();
    });

    app.on("activate", () => {
      if (this.mainWindow === null) this.createWindow();
    });

    app.on("before-quit", (event) => {
      if (this.mainWindow && this.mainWindow.webContents.session) {
        this.mainWindow.webContents.session.flushStorageData();
      }
    });
  }
}
