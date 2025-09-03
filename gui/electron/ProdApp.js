import { BaseApp } from "./BaseApp.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export class ProdApp extends BaseApp {
  loadContent() {
    this.mainWindow.loadFile(join(__dirname, "../build/index.html"));
  }
}
