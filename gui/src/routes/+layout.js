export const ssr = false;
import { goto } from "$app/navigation";
import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import { SessionController } from "@controllers/SessionController.js";

export async function load({ fetch, url }) {
  const sessionController = new SessionController();

  if (url.pathname === "/login") {
    return {};
  }

  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (!res.ok) {
    sessionController.reset();
    if (browser) {
      goto("/login");
      return {};
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

  sessionController.logued();
  sessionController.setUser(user);

  return { session: sessionController.getSession() };
}
