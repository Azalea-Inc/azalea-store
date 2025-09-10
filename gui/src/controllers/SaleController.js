import http from "$lib/http";

export class SaleController {
  async openTurn(turnData) {
    const { data } = await http.post("/turns", turnData);
    return data.data;
  }

  async closeTurn(closeAmount) {
    try {
      const { data } = await http.post(`/turns/current/close`, {
        closeAmount,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getBoxConfig() {
    const { data } = await http.get("/sales/box/config");
    return data.boxConfig;
  }

  async getTurn() {
    const { data } = await http.get("/turns/current/me");
    return data.turn;
  }
}
