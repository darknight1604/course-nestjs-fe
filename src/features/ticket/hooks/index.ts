import { snackbarAtom } from "@app/shared/atoms/snackbar-atom";
import { isNonEmptyString } from "@app/shared/utils/string-utils";
import type { IGetListTicketResponse, SearchTicketQuery } from "@app/types";
import dayjs from "dayjs";
import { atom, useAtom } from "jotai";
import { searchTickets, deleteTicket as deleteApi } from "../api";
import { cleanObject } from "@app/shared/utils/object-utils";

const dataAtom = atom<IGetListTicketResponse | undefined>();
const loadingAtom = atom<boolean>(false);

const currentQueryAtom = atom<SearchTicketQuery>();

const useFetchTicket = () => {
  const [loading, setLoading] = useAtom(loadingAtom);
  const [data, setData] = useAtom(dataAtom);
  const [, setSnackbar] = useAtom(snackbarAtom);
  const [currentQuery, setCurrentQuery] = useAtom(currentQueryAtom);

  const fetchData = async (query: SearchTicketQuery) => {
    setLoading(true);
    try {
      const response = await searchTickets(
        cleanObject({
          ...query,
          startDate: isNonEmptyString(query.startDate)
            ? dayjs(query.startDate).startOf("date").toISOString()
            : "",
          endDate: isNonEmptyString(query.endDate)
            ? dayjs(query.endDate).endOf("date").toISOString()
            : "",
        })
      );
      setData(response);
    } catch {
      setSnackbar({
        open: true,
        message: "Search tickets failed. Please try again.",
      });
    } finally {
      setCurrentQuery(query);
      setLoading(false);
    }
  };

  const deleteTicket = async (id: number) => {
    setLoading(true);
    try {
      await deleteApi(id);
      await fetchData(currentQuery || {});
    } catch {
      setSnackbar({
        open: true,
        message: `Delete ticket ${id} failed. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, fetchData, currentQuery, deleteTicket };
};

export default useFetchTicket;
