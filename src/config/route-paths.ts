type RoutePath = {
  name: string;
  path: string;
};

export const routePaths: Record<string, RoutePath> = {
  admin: { name: "admin", path: "/admin" },
  login: { name: "login", path: "/login" },
};
