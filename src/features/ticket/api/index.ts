import { apiClient } from "@app/shared/http-client";
import type { IGetListTicketResponse, SearchTicketQuery } from "@app/types";

export async function searchTickets(
  params: SearchTicketQuery
): Promise<IGetListTicketResponse> {
  const response = await apiClient.get<IGetListTicketResponse>(
    "/tickets",
    {
      params,
    }
  );
  return response;
}
