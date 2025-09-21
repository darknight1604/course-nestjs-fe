import { Box, Button, Stack, TextField, MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useFetchUser from "../../hooks";
import { useEffect } from "react";
import type { SearchUserQuery } from "@app/types";

const validationSchema = Yup.object({
  username: Yup.string().optional(),
  isActive: Yup.boolean().optional(),
});

const SearchForm = () => {
  const { fetchData } = useFetchUser();
  const initialValues: SearchUserQuery = {
    username: "",
    isActive: undefined,
  };

  const onSearch = (values: SearchUserQuery) => {
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
      onSubmit={onSearch}
    >
      {({ values, handleChange, resetForm }) => (
        <Form>
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                <TextField
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  select
                  label="Status"
                  name="isActive"
                  value={values.isActive ?? ""}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </TextField>
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
