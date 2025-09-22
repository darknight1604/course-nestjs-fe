import { snackbarAtom } from "@app/shared/atoms/snackbar-atom";
import { cleanObject } from "@app/shared/utils/object-utils";
import type {
  IGetListUserResponse,
  SearchUserQuery,
  UpdateUserRequest,
} from "@app/types";
import { atom, useAtom } from "jotai";
import { searchUsers, updateUser } from "../api";

const dataAtom = atom<IGetListUserResponse | undefined>();
const loadingAtom = atom<boolean>(false);
const currentQueryAtom = atom<SearchUserQuery>();

const useFetchUser = () => {
  const [loading, setLoading] = useAtom(loadingAtom);
  const [data, setData] = useAtom(dataAtom);
  const [, setSnackbar] = useAtom(snackbarAtom);
  const [currentQuery, setCurrentQuery] = useAtom(currentQueryAtom);

  const fetchData = async (query: SearchUserQuery) => {
    setLoading(true);
    try {
      const response = await searchUsers(cleanObject({ ...query }));
      setData(response);
    } catch {
      setSnackbar({
        open: true,
        message: "Search users failed. Please try again.",
      });
    } finally {
      setCurrentQuery(query);
      setLoading(false);
    }
  };
  const toggleActive = async (params: UpdateUserRequest) => {
    setLoading(true);
    try {
      await updateUser({ ...params, isActive: !(params.isActive || false) });
      await fetchData(currentQuery || {});
    } catch {
      setSnackbar({
        open: true,
        message: "Search users failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, fetchData, currentQuery, toggleActive };
};

export default useFetchUser;
