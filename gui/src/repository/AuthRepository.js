import http from "$lib/http";

export class AuthRepository {
  async getUserInfo() {
    try {
      const { data } = await http.get("/auth/me");
      return data.user;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await http.post("/auth/logout");
    } catch (error) {
      throw error;
    }
  }
}
