export const ssr = false;
import { goto } from "$app/navigation";
import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import { userStore } from "@store/UserStore.js";

export async function load({ fetch, url }) {
  if (url.pathname === "/login") {
    return {};
  }

  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (!res.ok) {
    userStore.reset();
    if (browser) {
      goto("/login");
      return {}; // evita que siga ejecutando
    } else {
      throw redirect(307, "/login");
    }
  }

  const { user } = await res.json();

  if (!user || !user.id) {
    if (browser) {
      goto("/login");
      return {};
    } else {
      throw redirect(307, "/login");
    }
  }

  const session = {
    ...user,
    isLogged: true,
  };

  return { session };
}
