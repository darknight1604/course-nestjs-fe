import { apiClient } from "@app/shared/http-client";
import type {
  CreateSprintRequest,
  IGetListSprintResponse,
  ISprint,
  SearchSprintQuery,
  UpdateSprintRequest,
} from "@app/types";

export async function searchSprints(
  params: SearchSprintQuery
): Promise<IGetListSprintResponse> {
  const response = await apiClient.get<IGetListSprintResponse>("/sprints", {
    params,
  });
  return response;
}

export async function deleteSprint(id: number): Promise<void> {
  await apiClient.delete(`/sprints/${id}`);
}

export async function createSprint(
  request: CreateSprintRequest
): Promise<void> {
  await apiClient.post("/sprints", request);
}

export async function getSprint(id: number): Promise<ISprint> {
  const response = await apiClient.get<ISprint>(`/sprints/${id}`);

  return response;
}

export async function updateSprint(
  request: UpdateSprintRequest
): Promise<void> {
  await apiClient.patch(`/sprints/${request.id}`, request);
}
