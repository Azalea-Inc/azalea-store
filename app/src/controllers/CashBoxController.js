const CashBox = require("../models/CashBox");

class CashBoxController {
  async createBox(data) {
    return CashBox.build(data);
  }
}

module.exports = CashBoxController;
