export interface AuthResponse {
  accessToken: string;
  username: string;
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
};
