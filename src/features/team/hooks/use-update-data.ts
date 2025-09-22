import { snackbarAtom } from "@app/shared/atoms/snackbar-atom";
import type { ITeam, UpdateTeamRequest } from "@app/types";
import { useAtom } from "jotai";
import { useState } from "react";
import { getTeam as getApi, updateTeam as updateApi } from "../api";

const useUpdateData = () => {
  const [data, setData] = useState<ITeam>();
  const [, setSnackbar] = useAtom(snackbarAtom);
  const [loading, setLoading] = useState(false);

  const getDetail = async (id: number) => {
    setLoading(true);
    try {
      const data = await getApi(id);
      setData(data);
    } catch {
      setSnackbar({
        open: true,
        message: `Fetch team ${id} failed. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (request: UpdateTeamRequest) => {
    setLoading(true);
    try {
      await updateApi(request);
    } catch {
      setSnackbar({
        open: true,
        message: `Update team ${request.id} failed. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { getDetail, data, loading, updateData };
};

export default useUpdateData;
