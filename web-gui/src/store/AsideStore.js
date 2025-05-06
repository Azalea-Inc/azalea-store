import { writable } from "svelte/store";

import {
  ShoppingCart,
  Package,
  Box,
  Settings,
  NotebookPen,
  User,
} from "lucide-svelte";

const initialState = {
  menu: [
    {
      title: "Ventas",
      href: "/",
      icon: ShoppingCart,
      notifications: 0,
    },
    {
      title: "Inventario",
      href: "/inventory",
      icon: NotebookPen,
      notifications: 0,
    },
    {
      title: "Productos",
      href: "/products",
      icon: Package,
      notifications: 0,
    },
    {
      title: "Cajas",
      href: "/cashbox",
      icon: Box,
      notifications: 0,
    },
    {
      title: "Usuarios",
      href: "/users",
      icon: User,
      notifications: 0,
    },
  ],
};

function createAsideStore() {
  const { subscribe, set, update } = writable(initialState);

  const reset = () => {
    set(initialState);
  };

  return {
    subscribe,
    reset,
    set,
    update,
  };
}

export const asideStore = createAsideStore();
