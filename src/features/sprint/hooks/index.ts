import { snackbarAtom } from "@app/shared/atoms/snackbar-atom";
import { cleanObject } from "@app/shared/utils/object-utils";
import { atom, useAtom } from "jotai";
import {
  createSprint as createApi,
  deleteSprint as deleteApi,
  searchSprints,
} from "../api";
import type {
  CreateSprintRequest,
  IGetListSprintResponse,
  SearchSprintQuery,
} from "@app/types";

const dataAtom = atom<IGetListSprintResponse | undefined>();
const loadingAtom = atom<boolean>(false);

const currentQueryAtom = atom<SearchSprintQuery>();

const useFetchData = () => {
  const [loading, setLoading] = useAtom(loadingAtom);
  const [data, setData] = useAtom(dataAtom);
  const [, setSnackbar] = useAtom(snackbarAtom);
  const [currentQuery, setCurrentQuery] = useAtom(currentQueryAtom);

  const fetchData = async (query: SearchSprintQuery) => {
    setLoading(true);
    try {
      const response = await searchSprints(
        cleanObject({
          ...query,
        })
      );
      setData(response);
    } catch {
      setSnackbar({
        open: true,
        message: "Search sprints failed. Please try again.",
      });
    } finally {
      setCurrentQuery(query);
      setLoading(false);
    }
  };

  const deleteSprint = async (id: number) => {
    setLoading(true);
    try {
      await deleteApi(id);
      await fetchData(currentQuery || {});
      setSnackbar({
        open: true,
        message: `Delete Sprint successfully`,
      });
    } catch {
      setSnackbar({
        open: true,
        message: `Delete Sprint ${id} failed. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const createSprint = async (request: CreateSprintRequest) => {
    setLoading(true);
    try {
      await createApi(request);
      await fetchData(currentQuery || {});
      setSnackbar({
        open: true,
        message: `Create Sprint successfully`,
      });
    } catch {
      setSnackbar({
        open: true,
        message: `Create Sprint failed. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, fetchData, currentQuery, deleteSprint, createSprint };
};

export default useFetchData;
