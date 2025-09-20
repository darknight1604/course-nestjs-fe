import { apiClient } from "@app/shared/http-client";
import type { AuthResponse, LoginRequest } from "@app/types";

export const login = async (request: LoginRequest): Promise<AuthResponse> => {
  return await apiClient.post<AuthResponse>("/auth/login", request);
};
