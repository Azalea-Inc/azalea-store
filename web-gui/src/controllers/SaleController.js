import http from "$lib/http";

export class SaleController {
  async openTurn(turnData) {
    const { data } = await http.post("/cashbox/open", turnData);
    return data.data;
  }

  async closeTurn(turnId, closeAmount) {
    const { data } = await http.post(`/cashbox/${turnId}/close`, {
      closeAmount,
    });
    return data;
  }
}
