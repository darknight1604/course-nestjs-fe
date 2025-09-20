type RoutePath = {
  name: string;
  path: string;
};

export const routePaths: Record<string, RoutePath> = {
  admin: { name: "admin", path: "/admin" },
  login: { name: "login", path: "/login" },
  ticket: { name: "ticket", path: "/ticket" },
  user: { name: "user", path: "/user" },
  logout: { name: "logout", path: "/logout" },
};

export function buildPath(paths: string[]) {
  return paths.join("");
}
