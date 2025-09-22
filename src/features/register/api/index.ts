import { apiClient } from "@app/shared/http-client";
import type { CreateUserRequest } from "@app/types";

export async function createUser(params: CreateUserRequest): Promise<void> {
  await apiClient.post("/auth/register", params);
}
