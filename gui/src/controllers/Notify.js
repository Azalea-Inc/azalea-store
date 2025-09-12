import { toast } from "svelte-sonner";

class Notify {
  info(message) {
    toast.info(message);
  }

  success(message) {
    toast.success(message);
  }
  error(message) {
    toast.error(message);
  }
}

export const notify = new Notify();
