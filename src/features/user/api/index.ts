import { apiClient } from "@app/shared/http-client";
import type {
  IGetListUserResponse,
  SearchUserQuery,
  UpdateUserRequest,
} from "@app/types";

export async function searchUsers(
  params: SearchUserQuery
): Promise<IGetListUserResponse> {
  const response = await apiClient.get<IGetListUserResponse>("/users", {
    params,
  });
  return response;
}

export async function updateUser(params: UpdateUserRequest): Promise<void> {
  await apiClient.patch(`/users/${params.id}`, params);
}
