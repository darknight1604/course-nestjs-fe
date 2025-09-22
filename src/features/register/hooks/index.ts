import { snackbarAtom } from "@app/shared/atoms/snackbar-atom";
import type { CreateUserRequest } from "@app/types";
import { atom, useAtom } from "jotai";
import { createUser as createApi } from "../api";

const loadingAtom = atom<boolean>(false);

const useCreateUser = () => {
  const [loading, setLoading] = useAtom(loadingAtom);
  const [, setSnackbar] = useAtom(snackbarAtom);

  const createUser = async (
    request: CreateUserRequest,
    onPost: VoidFunction
  ) => {
    setLoading(true);
    try {
      await createApi(request);
      setSnackbar({
        open: true,
        message: `Register User successfully`,
      });
      onPost();
    } catch {
      setSnackbar({
        open: true,
        message: `Register User failed. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, createUser };
};

export default useCreateUser;
