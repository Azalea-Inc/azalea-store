import http from "$lib/http";
import { bus } from "$lib/EventBus";

export class UserController {
  async addUser(user) {
    try {
      const response = await http.post("/users", user);
      bus.emit("user-added");
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
