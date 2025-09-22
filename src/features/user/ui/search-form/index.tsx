import { ROLES } from "@app/config/contants";
import type { SearchUserQuery } from "@app/types";
import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import useFetchUser from "../../hooks";

const rolesOptions = Object.values(ROLES).concat();
const validationSchema = Yup.object({
  username: Yup.string().optional(),
  isActive: Yup.boolean().optional(),
  role: Yup.string()
    .oneOf([...rolesOptions, ""])
    .optional(),
});

const SearchForm = () => {
  const { fetchData } = useFetchUser();
  const initialValues: SearchUserQuery = {
    username: "",
    isActive: undefined,
    role: "",
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
      {({ values, handleChange, resetForm, touched, errors }) => (
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

                {/* Status */}
                <TextField
                  select
                  label="Role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  error={touched.role && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                  fullWidth
                >
                  {rolesOptions.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
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
