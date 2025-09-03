import http from "$lib/http";

export class SaleController {
  async openTurn(turnData) {
    const { data } = await http.post("/turns", turnData);
    console.log(data);
    return data.data;
  }

  async closeTurn(turnId, closeAmount) {
    const { data } = await http.post(`/turns/${turnId}/close`, {
      closeAmount,
    });
    return data;
  }
}
