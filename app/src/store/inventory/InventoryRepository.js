const InventoryEntity = require("./InventoryEntity");

class InventoryRepository {
  constructor() {
    this.model = InventoryEntity;
    this.productModel = require("$store/products/ProductEntity");
    this.movementModel = require("./MovementEntity");
  }

  async add(data) {
    const product = await this.productModel.findByPk(data.productId);
    if (!product) throw new Error("Product not found");
    return product.createInventory(data);
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

  async activateProductToInventory(id) {
    const inventory = await this.model.findByPk(id);
    if (!inventory) throw new Error("Inventory not found");
    await inventory.update({ isActive: true });
  }

  async deactivateProductToInventory(id) {
    const inventory = await this.model.findByPk(id);
    if (!inventory) throw new Error("Inventory not found");
    await inventory.update({ isActive: false });
  }

  async addMovement(id, movement) {
    const inventory = await this.model.findByPk(id);
    if (!inventory) throw new Error("Inventory not found");

    if (movement.type !== "INPUT" && movement.type !== "OUTPUT") {
      throw new Error("Movement type must be INPUT or OUTPUT");
    }

    if (movement.type === "OUTPUT") {
      const numericStock = Number(inventory.stock);
      const numericAmount = Number(movement.amount);
      if (numericStock < numericAmount) {
        throw new Error("Not enough stock");
      }
      inventory.stock = numericStock - numericAmount;
    } else {
      inventory.stock = Number(inventory.stock) + Number(movement.amount);
    }

    await inventory.save();
    return await this.movementModel.create(movement);
  }

  async showMovementsToInventory(id) {
    const inventory = await this.model.findByPk(id);
    if (!inventory) throw new Error("Inventory not found");
    return await inventory.getMovements();
  }

  async showMovementDetail(id) {
    const movement = await this.movementModel.findByPk(id, {
      include: "inventory",
    });
    if (!movement) throw new Error("Movement not found");
    return movement;
  }
}

module.exports = InventoryRepository;
