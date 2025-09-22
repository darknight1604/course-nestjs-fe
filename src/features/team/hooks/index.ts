import { snackbarAtom } from "@app/shared/atoms/snackbar-atom";
import { cleanObject } from "@app/shared/utils/object-utils";
import type {
  CreateTeamRequest,
  IGetListTeamResponse,
  SearchTeamQuery,
} from "@app/types";
import { atom, useAtom } from "jotai";
import {
  createTeam as createApi,
  deleteTeam as deleteApi,
  searchTeams,
} from "../api";

const dataAtom = atom<IGetListTeamResponse | undefined>();
const loadingAtom = atom<boolean>(false);

const currentQueryAtom = atom<SearchTeamQuery>();

const useFetchData = () => {
  const [loading, setLoading] = useAtom(loadingAtom);
  const [data, setData] = useAtom(dataAtom);
  const [, setSnackbar] = useAtom(snackbarAtom);
  const [currentQuery, setCurrentQuery] = useAtom(currentQueryAtom);

  const fetchData = async (query: SearchTeamQuery) => {
    setLoading(true);
    try {
      const response = await searchTeams(
        cleanObject({
          ...query,
        })
      );
      setData(response);
    } catch {
      setSnackbar({
        open: true,
        message: "Search teams failed. Please try again.",
      });
    } finally {
      setCurrentQuery(query);
      setLoading(false);
    }
  };

  const deleteTeam = async (id: number) => {
    setLoading(true);
    try {
      await deleteApi(id);
      await fetchData(currentQuery || {});
      setSnackbar({
        open: true,
        message: `Delete team successfully`,
      });
    } catch {
      setSnackbar({
        open: true,
        message: `Delete team ${id} failed. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async (request: CreateTeamRequest) => {
    setLoading(true);
    try {
      await createApi(request);
      await fetchData(currentQuery || {});
      setSnackbar({
        open: true,
        message: `Create team successfully`,
      });
    } catch {
      setSnackbar({
        open: true,
        message: `Create team failed. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, fetchData, currentQuery, deleteTeam, createTeam };
};

export default useFetchData;
