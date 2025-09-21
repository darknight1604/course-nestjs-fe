import { apiClient } from "@app/shared/http-client";
import type { IGetListUserResponse, SearchUserQuery } from "@app/types";

export async function searchUsers(
  params: SearchUserQuery
): Promise<IGetListUserResponse> {
  const response = await apiClient.get<IGetListUserResponse>("/users", {
    params,
  });
  return response;
}
