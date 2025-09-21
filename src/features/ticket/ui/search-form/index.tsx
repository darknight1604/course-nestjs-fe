import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useFetchTicket from "../../hooks";
import { useEffect } from "react";

export interface SearchTicketFormValues {
  title?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

const statusOptions = ["OPEN", "IN_PROGRESS", "DONE", "CLOSED"];

const validationSchema = Yup.object({
  title: Yup.string().optional(),
  status: Yup.string()
    .oneOf([...statusOptions, ""])
    .optional(),
  startDate: Yup.date().nullable().optional(),
  endDate: Yup.date()
    .nullable()
    .optional()
    .min(Yup.ref("startDate"), "End date must be after start date"),
});

const SearchForm = () => {
  const { fetchData } = useFetchTicket();
  const initialValues: SearchTicketFormValues = {
    title: "",
    status: "",
    startDate: "",
    endDate: "",
  };

  const onSearch = (values: SearchTicketFormValues) => {
    fetchData(values);
  };

  useEffect(() => {
    fetchData(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSearch(values);
      }}
    >
      {({ values, handleChange, touched, errors, resetForm }) => (
        <Form>
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                {/* Title */}
                <TextField
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  fullWidth
                />

                {/* Status */}
                <TextField
                  select
                  label="Status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  error={touched.status && Boolean(errors.status)}
                  helperText={touched.status && errors.status}
                  fullWidth
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>

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
              </Stack>

              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button type="submit" variant="contained">
                  Search
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    resetForm();
                    fetchData(initialValues);
                  }}
                >
                  Reset
                </Button>
              </Box>
            </Stack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
