import { writable } from "svelte/store";

import {
  Home,
  ShoppingCart,
  Package,
  NotebookPen,
  CircleDollarSign,
  User,
  Users,
} from "@components/icons";

const initialState = {
  menu: [
    {
      title: "Inicio",
      href: "/",
      icon: Home,
      notifications: 0,
    },
    {
      title: "Ventas",
      href: "/sales",
      icon: ShoppingCart,
      notifications: 0,
    },
    {
      title: "Productos",
      href: "/products",
      icon: Package,
      notifications: 0,
    },
    {
      title: "Inventario",
      href: "/inventory",
      icon: NotebookPen,
      notifications: 0,
    },
    {
      title: "Cajas",
      href: "/cashbox",
      icon: CircleDollarSign,
      notifications: 0,
    },
    {
      title: "Usuarios",
      href: "/users",
      icon: User,
      notifications: 0,
    },
    {
      title: "Clientes",
      href: "/clients",
      icon: Users,
      notifications: 0,
    },
  ],
};

function createAside() {
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

export const aside = createAside();
