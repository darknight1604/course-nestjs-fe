import { apiClient } from "@app/shared/http-client";
import type {
  CreateTeamRequest,
  IGetListTeamResponse,
  ITeam,
  SearchTeamQuery,
  UpdateTeamRequest,
} from "@app/types";

export async function searchTeams(
  params: SearchTeamQuery
): Promise<IGetListTeamResponse> {
  const response = await apiClient.get<IGetListTeamResponse>("/teams", {
    params,
  });
  return response;
}

export async function deleteTeam(id: number): Promise<void> {
  await apiClient.delete(`/teams/${id}`);
}

export async function createTeam(request: CreateTeamRequest): Promise<void> {
  await apiClient.post("/teams", request);
}

export async function getTeam(id: number): Promise<ITeam> {
  const response = await apiClient.get<ITeam>(`/teams/${id}`);

  return response;
}

export async function updateTeam(request: UpdateTeamRequest): Promise<void> {
  await apiClient.patch(`/teams/${request.id}`, request);
}
