export const ssr = false;
import { goto } from "$app/navigation";
import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import { SessionController } from "@controllers/SessionController.js";

export async function load({ fetch, url }) {
  const sessionController = new SessionController();
  const res = await fetch("/api/auth/me", { credentials: "include" });
  const isLogin = url.pathname === "/login";

  const redirectTo = (path) => {
    if (browser) {
      goto(path);
      return {};
    }
    throw redirect(307, path);
  };

  if (isLogin && !res.ok) return {};
  if (isLogin && res.ok) return redirectTo("/");
  if (!res.ok) {
    sessionController.reset();
    return redirectTo("/login");
  }

  const { user } = await res.json();
  if (!user?.id) return redirectTo("/login");

  sessionController.logued();
  sessionController.setUser(user);

  return;
}
