import type { ROLES } from "@app/config/contants";

export interface AuthResponse {
  accessToken: string;
  username: string;
  roles?: ROLES[];
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
  requiredRoles: ROLES[];
};

export type WSMessageData = {
  type: "notification" | "background-task";
  message?: string;
  data?: unknown;
};
