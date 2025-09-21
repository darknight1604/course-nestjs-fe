import { apiClient } from "@app/shared/http-client";
import type {
  CreateTicketRequest,
  IGetListTicketResponse,
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
