import { apiClient } from "@app/shared/http-client";

export const logout = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};
