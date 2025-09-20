// hooks/useAuthSync.ts
import { authAtom } from "@app/shared/atoms/auth-atom";
import { apiClient } from "@app/shared/http-client";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const useAuthSync = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        if (auth) {
          apiClient.setAccessToken(auth.accessToken);
          return;
        }
        const authData = await apiClient.refreshToken();
        setAuth(authData);
        apiClient.setAccessToken(authData.accessToken);
      } catch {
        setAuth(undefined);
      } finally {
        setLoading(false);
      }
    };

    refreshAuth();
  }, [auth, setAuth]);

  return { loading };
};
