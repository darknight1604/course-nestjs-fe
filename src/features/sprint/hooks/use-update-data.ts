import { snackbarAtom } from "@app/shared/atoms/snackbar-atom";
import type { ISprint, UpdateSprintRequest } from "@app/types";
import { useAtom } from "jotai";
import { useState } from "react";
import { getSprint as getApi, updateSprint as updateApi } from "../api";

const useUpdateData = () => {
  const [data, setData] = useState<ISprint>();
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
        message: `Fetch Sprint ${id} failed. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (request: UpdateSprintRequest) => {
    setLoading(true);
    try {
      await updateApi(request);
    } catch {
      setSnackbar({
        open: true,
        message: `Update Sprint ${request.id} failed. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { getDetail, data, loading, updateData };
};

export default useUpdateData;
