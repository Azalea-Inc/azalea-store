const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os");

const configDir = path.join(os.homedir(), "azalea-store", "config");
const configPath = path.join(configDir, "config.json");

class ConfigController {
  async getConfig() {
    try {
      const config = await fs.promises.readFile(configPath, "utf8");
      return JSON.parse(config);
    } catch (error) {
      return null;
    }
  }

  async createConfig() {
    try {
      await fs.promises.mkdir(configDir, { recursive: true });

      const config = {
        store_name: "My store",
        branch_id: crypto.randomBytes(16).toString("hex"),
        remote_store_id: null,
        remote_sync_url: null,
        created_at: new Date().toISOString(),
        updated_at: null,
      };

      await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2));
      console.log("✅ Archivo de configuración creado:", configPath);
      return config;
    } catch (error) {
      console.error("❌ Error creating config file:", error);
      return null;
    }
  }

  async init() {
    let config = await this.getConfig();

    if (!config) {
      console.log("📦 Config file not found. Creating default config...");
      config = await this.createConfig();
    }

    return config;
  }

  async saveConfig(config) {
    try {
      config.updated_at = new Date().toISOString();
      await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2));
      console.log("✅ Config file saved:", configPath);
    } catch (error) {
      console.error("❌ Error saving config file:", error);
    }
  }

  async updateConfig(newConfig) {
    const config = await this.getConfig();
    if (!config) return null;
    Object.assign(config, newConfig);
    await this.saveConfig(config);
    return config;
  }

  async renameStore(name) {
    if (!name) throw new Error("Invalid name");
    const config = await this.getConfig();
    if (!config) return null;
    if (config.store_name === name) throw new Error("Name already in use");
    config.store_name = name;
    await this.saveConfig(config);
    return config;
  }
}

module.exports = ConfigController;
