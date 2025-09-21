import { snackbarAtom } from "@app/shared/atoms/snackbar-atom";
import type { CreateTicketRequest, ITicket } from "@app/types";
import { useAtom } from "jotai";
import { useState } from "react";
import { getTicket as getApi, updateTicket as updateApi } from "../api";

const useUpdateTicket = () => {
  const [ticket, setTicket] = useState<ITicket>();
  const [, setSnackbar] = useAtom(snackbarAtom);
  const [loading, setLoading] = useState(false);

  const getTicket = async (id: number) => {
    setLoading(true);
    try {
      const ticket = await getApi(id);
      setTicket(ticket);
    } catch {
      setSnackbar({
        open: true,
        message: `Fetch ticket ${id} failed. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (request: CreateTicketRequest) => {
    setLoading(true);
    try {
      await updateApi(request);
    } catch {
      setSnackbar({
        open: true,
        message: `Update ticket ${request.id} failed. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { getTicket, ticket, loading, updateTicket };
};

export default useUpdateTicket;
