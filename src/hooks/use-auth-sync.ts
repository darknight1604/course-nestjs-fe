import { isLoggedOutAtom } from "@app/shared/atoms";
import { authAtom } from "@app/shared/atoms/auth-atom";
import { apiClient } from "@app/shared/http-client";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const useAuthSync = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const [loading, setLoading] = useState(true);
  const [isLoggedOut] = useAtom(isLoggedOutAtom);

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        if (isLoggedOut) return;
        if (auth) {
          apiClient.setAccessToken(auth.accessToken);
          return;
        }
        const authData = await apiClient.refreshToken();
        setAuth(authData);
      } catch {
        setAuth(undefined);
      } finally {
        setLoading(false);
      }
    };

    refreshAuth();
  }, [auth, isLoggedOut, setAuth]);

  return { loading };
};
