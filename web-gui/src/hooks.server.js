import { redirect } from "@sveltejs/kit";

const PROTECTED_ROUTES = ["/dashboard", "/profile", "/admin"];

export const handle = async ({ event, resolve }) => {
  // const session = event.cookies.get("session");
  // event.locals.user = session ? { name: "Joan", isLogged: true } : null;

  // const path = event.url.pathname;
  // const isProtected = PROTECTED_ROUTES.some((r) => path.startsWith(r));
  // const isAuthRoute = path.startsWith("/login");

  // if (!isAuthRoute && !event.locals.user) {
  //   throw redirect(303, "/login");
  // }

  // if (event.locals.user && path === "/login") {
  //   throw redirect(303, "/");
  // }

  return resolve(event);
};
