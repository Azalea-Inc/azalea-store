const Turn = require("$models/Turn");
const MoneyMovement = require("$models/MoneyMovement");
const TurnRepository = require("./TurnRepository");

module.exports = class TurnController {
  constructor() {
    this.repository = new TurnRepository();
  }

  async openTurn(data) {
    const turn = Turn.build(data);
    return await this.repository.openTurn(turn);
  }

  async closeTurn(id, closeAmount) {
    await this.repository.closeTurn(id, closeAmount);
  }

  async showTurns() {
    return await this.repository.showTurns();
  }

  async showTurn(id) {
    return await this.repository.showTurn(id);
  }

  async createMovement(registryId, data) {
    const movement = MoneyMovement.build({ registryId, ...data });
    return await this.repository.createMovement(registryId, movement);
  }

  async showMovementsByTurn(turnId) {
    return await this.repository.showMovementsByTurn(turnId);
  }
};
