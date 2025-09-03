import { toast } from "svelte-sonner";

class Notify {
  success(message) {
    toast.success(message);
  }
  error(message) {
    toast.error(message);
  }
}

export const notify = new Notify();
