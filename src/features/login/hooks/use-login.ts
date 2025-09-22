import { authAtom } from "@app/shared/atoms/auth-atom";
import { snackbarAtom } from "@app/shared/atoms/snackbar-atom";
import type { LoginRequest } from "@app/types";
import { useAtom } from "jotai";
import { useState } from "react";
import { login as loginApi } from "../api";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [, setAuth] = useAtom(authAtom);
  const [, setSnackbar] = useAtom(snackbarAtom);

  const login = async (
    request: LoginRequest,
    onSuccess: (roles: string[] | undefined) => void
  ) => {
    setLoading(true);
    try {
      const response = await loginApi(request);
      setAuth(response);
      onSuccess(response.roles);
      setSnackbar({
        open: true,
        message: "Login sucessfully",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
