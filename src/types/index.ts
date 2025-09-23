export * from "./api.type";

export interface AuthResponse {
  accessToken: string;
  username: string;
  roles?: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export type VoidCallback = () => void;

export type ListItemData = {
  path: string;
  icon: React.ReactElement;
  name: string;
  requiredRoles: string[];
};

export type WSMessageData = {
  type: "notification" | "background-task";
  message?: string;
  data?: unknown;
};
