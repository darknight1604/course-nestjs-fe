import type { SearchSprintFormValues } from "@app/types";
import { Box, Button, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import useFetchData from "../../hooks";

const validationSchema = Yup.object({
  title: Yup.string().optional(),
});

const SearchForm = () => {
  const { fetchData } = useFetchData();
  const initialValues: SearchSprintFormValues = {
    title: "",
  };

  const onSearch = (values: SearchSprintFormValues) => {
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
