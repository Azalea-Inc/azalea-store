const InventoryEntity = require("../entities/InventoryEntity");

class InventoryRepository {
  constructor() {
    this.model = InventoryEntity;
  }

  async add(data) {
    const inventory = await this.model.create(data);
    return inventory;
  }

  async getAll() {
    const inventories = await this.model.findAll({
      include: "product",
    });
    return inventories;
  }

  async update(id, data) {
    const inventory = await this.model.findByPk(id);
    if (!inventory) throw new Error("Inventory not found");
    await inventory.update(data);
    return inventory;
  }

  async delete(id) {
    const inventory = await this.model.findByPk(id);
    if (!inventory) throw new Error("Inventory not found");
    await inventory.destroy();
    return inventory;
  }

  async getById(id) {
    const inventory = await this.model.findByPk(id);
    if (!inventory) throw new Error("Inventory not found");
    return inventory;
  }

  async remove(id) {
    const inventory = await this.model.findByPk(id);
    if (!inventory) throw new Error("Inventory not found");
    await inventory.destroy();
    return inventory;
  }

  async deactivateProductToInventory(id) {
    const inventory = await this.model.findByPk(id);
    if (!inventory) throw new Error("Inventory not found");
    await inventory.update({ isActive: false });
    return inventory;
  }
}

module.exports = InventoryRepository;
