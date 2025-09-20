import { authAtom } from "@app/shared/atoms/auth-atom";
import type { VoidCallback } from "@app/types";
import { useAtom } from "jotai";
import { useState } from "react";
import { logout as logoutApi } from "../api";
import { isLoggedOutAtom } from "@app/shared/atoms";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [, setAuth] = useAtom(authAtom);
  const [, setIsLoggedOut] = useAtom(isLoggedOutAtom);

  const logout = async (onSuccess: VoidCallback) => {
    try {
      await logoutApi();
      setAuth(undefined);
      setIsLoggedOut(true);
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};
