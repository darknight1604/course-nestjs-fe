import type { SearchTeamFormValues } from "@app/types";
import { Box, Button, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import useFetchData from "../../hooks";

const validationSchema = Yup.object({
  name: Yup.string().optional(),
});

const SearchForm = () => {
  const { fetchData } = useFetchData();
  const initialValues: SearchTeamFormValues = {
    name: "",
  };

  const onSearch = (values: SearchTeamFormValues) => {
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
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
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
