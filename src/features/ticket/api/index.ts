import { apiClient } from "@app/shared/http-client";
import type {
  CreateTicketRequest,
  IGetListTicketResponse,
  ITicket,
  SearchTicketQuery,
} from "@app/types";

export async function searchTickets(
  params: SearchTicketQuery
): Promise<IGetListTicketResponse> {
  const response = await apiClient.get<IGetListTicketResponse>("/tickets", {
    params,
  });
  return response;
}

export async function deleteTicket(id: number): Promise<void> {
  await apiClient.delete(`/tickets/${id}`);
}

export async function createTicket(
  request: CreateTicketRequest
): Promise<void> {
  await apiClient.post("/tickets", request);
}

export async function getTicket(id: number): Promise<ITicket> {
  const response = await apiClient.get<ITicket>(`/tickets/${id}`);

  return response;
}

export async function updateTicket(
  request: CreateTicketRequest
): Promise<void> {
  await apiClient.patch(`/tickets/${request.id}`, request);
}
