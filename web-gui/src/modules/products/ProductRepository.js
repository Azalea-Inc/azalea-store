import http from "$lib/http";

export class ProductRepository {
  constructor() {
    this.http = http;
  }

  async getProducts(page, limit) {
    try {
      const { data } = await this.http.get(
        `/products?page=${page}&limit=${limit}`,
      );

      return { products: data.data, pagination: data.pagination };
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      await this.http.delete(`/products/${id}`);
    } catch (error) {
      throw error;
    }
  }
}
