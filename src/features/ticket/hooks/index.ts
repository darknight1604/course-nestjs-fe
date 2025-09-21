import { snackbarAtom } from "@app/shared/atoms/snackbar-atom";
import { isNonEmptyString } from "@app/shared/utils/string-utils";
import type { IGetListTicketResponse, SearchTicketQuery } from "@app/types";
import dayjs from "dayjs";
import { atom, useAtom } from "jotai";
import { searchTickets } from "../api";

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
      const response = await searchTickets({
        ...query,
        startDate: isNonEmptyString(query.startDate)
          ? dayjs(query.startDate).startOf("date").toISOString()
          : "",
        endDate: isNonEmptyString(query.endDate)
          ? dayjs(query.endDate).endOf("date").toISOString()
          : "",
      });
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

  return { loading, data, fetchData, currentQuery };
};

export default useFetchTicket;
