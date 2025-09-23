type RoutePath = {
  name: string;
  path: string;
};

export const routePaths: Record<string, RoutePath> = {
  admin: { name: "admin", path: "/admin" },
  login: { name: "login", path: "/login" },
  register: { name: "register", path: "/register" },
  ticket: { name: "ticket", path: "/ticket" },
  user: { name: "user", path: "/user" },
  logout: { name: "logout", path: "/logout" },
  home: { name: "home", path: "/" },
  team: { name: "team", path: "/team" },
  sprint: { name: "sprint", path: "/sprint" },
};

export function buildPath(paths: string[]) {
  return paths.join("");
}
