import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import useUpdateData from "../../hooks/use-update-data";
import { createSchema } from "./schema";
import type { ITeam } from "@app/types";
import { default as useTeamFetchData } from "@app/features/team/hooks";
import { DateTimeUtil } from "@app/shared/utils/date-time-utils";
import { DATE_FORMATS } from "@app/config/contants";
import dayjs from "dayjs";

interface CreateFormValues {
  id?: number;
  title: string;
  teamId?: number;
  teamName?: string;
  startDate?: string | Date;
  endDate?: string | Date;
}

interface ICreateFormProps {
  onSubmit: (values: CreateFormValues) => void;
  id?: number;
}

export const CreateForm = ({ onSubmit, id }: ICreateFormProps) => {
  const [options, setOptions] = useState<ITeam[]>([]);
  const { loading, getDetail, data, updateData } = useUpdateData();
  const { loading: teamLoading, fetchData } = useTeamFetchData();

  const handleSubmit = async (values: CreateFormValues) => {
    const request = {
      ...values,
      id: id,
      startDate: dayjs(values.startDate).toDate(),
      endDate: dayjs(values.endDate).toDate(),
    };
    if (id) {
      await updateData(request);
    }
    onSubmit(request);
  };

  const initialValues: CreateFormValues = useMemo(() => {
    if (data) {
      return {
        title: data.title || "",
        teamId: data.teamId,
        teamName: data.teamName,
        startDate: DateTimeUtil.formatWithTZ(data.startDate, DATE_FORMATS.ymd),
        endDate: DateTimeUtil.formatWithTZ(data.endDate, DATE_FORMATS.ymd),
      };
    }

    return {
      title: "",
      startDate: undefined,
      endDate: undefined,
    };
  }, [data]);

  const handleInputChange = async (_: unknown, value: string) => {
    const data = await fetchData({ name: value });
    setOptions(data || []);
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (id && !data) {
    // show loading only for edit mode
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {id ? "Edit Data" : "Create Data"}
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={createSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, handleChange, values, dirty, setFieldValue }) => (
          <Form noValidate>
            <Stack spacing={3}>
              {/* Name */}
              <TextField
                name="title"
                label="Title"
                value={values.title}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                fullWidth
              />
              <TextField
                label="Selected Team"
                value={values.teamName || ""}
                disabled
                fullWidth
              />
              <Autocomplete
                options={options}
                getOptionLabel={(option) => option?.name || ""}
                onInputChange={handleInputChange}
                onChange={(_, value) => {
                  setFieldValue("teamId", value?.id || 0);
                  setFieldValue("teamName", value?.name || 0);
                }}
                loading={teamLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search team"
                    fullWidth
                    error={touched.teamId && Boolean(errors.teamId)}
                    helperText={touched.teamId && errors.teamId}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {teamLoading ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
              {/* Start Date */}
              <TextField
                label="Start Date"
                type="date"
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
                error={touched.startDate && Boolean(errors.startDate)}
                helperText={touched.startDate && errors.startDate}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />

              {/* End Date */}
              <TextField
                label="End Date"
                type="date"
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
                error={touched.endDate && Boolean(errors.endDate)}
                helperText={touched.endDate && errors.endDate}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />

              {/* Actions */}
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button type="reset" variant="outlined" disabled={loading}>
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading || !dirty}
                >
                  {id ? "Update" : "Create"}
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
