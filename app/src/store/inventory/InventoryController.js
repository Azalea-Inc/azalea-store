const InventoryRepository = require("./InventoryRepository");
const Inventory = require("$models/Inventory");
const Movement = require("$models/Movement");

class InventoryController {
  constructor() {
    this.repository = new InventoryRepository();
  }

  async addInventory(data) {
    const inventory = Inventory.build(data);
    return await this.repository.add(inventory);
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id) {
    return await this.repository.getById(id);
  }

  async removeInventory(id) {
    return await this.repository.remove(id);
  }

  async activateProductToInventory(id) {
    await this.repository.activateProductToInventory(id);
  }

  async deactivateProductToInventory(id) {
    await this.repository.deactivateProductToInventory(id);
  }

  async addMovementToInventory(id, data) {
    const movement = Movement.build({ inventoryId: id, ...data });
    return await this.repository.addMovement(id, movement);
  }

  async showMovementsToInventory(id) {
    return await this.repository.showMovementsToInventory(id);
  }
  async showMovementDetail(id) {
    return await this.repository.showMovementDetail(id);
  }
}

module.exports = InventoryController;
