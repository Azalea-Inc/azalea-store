import { derived, writable } from "svelte/store";
import { sessionStore } from "@store/Session";
import { modals } from "@components/Modals";
import { SessionController } from "@controllers/SessionController";

import {
  Home,
  ShoppingCart,
  Package,
  NotebookPen,
  CircleDollarSign,
  User,
  Users,
} from "@components/icons";

const aside = {
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

export class AsideVM {
  constructor() {
    this.aside = writable({ ...aside });
    this.session = derived(sessionStore.session, ($session) => $session);
    this.sessionController = new SessionController();
  }

  reset() {
    this.aside.set(aside);
  }

  async logout() {
    modals.warning({
      title: "Cerrar sesión",
      message: "¿Está seguro que desea cerrar sesión?",
      confirmText: "Cerrar sesión",
      onConfirm: async () => {
        try {
          await this.sessionController.logout();
          window.location.href = "/";
        } catch (error) {
          notify.error(
            "Error al cerrar sesión asegurese de cerrar el turno abierto",
          );
        }
      },
    });
  }
}
