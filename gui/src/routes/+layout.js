export const ssr = false;
import { goto } from "$app/navigation";
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
    goto("/login");
  }

  const { user } = await res.json();

  if (!user || !user.id) {
    throw goto("/login");
  }

  const session = {
    ...user,
    isLogged: true,
  };

  return { session };
}
