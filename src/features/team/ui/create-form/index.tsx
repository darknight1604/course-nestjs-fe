import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useMemo } from "react";
import useUpdateData from "../../hooks/use-update-data";
import { createSchema } from "./schema";

interface CreateFormValues {
  id?: number;
  name: string;
}

interface ICreateFormProps {
  onSubmit: (values: CreateFormValues) => void;
  id?: number;
}

export const CreateForm = ({ onSubmit, id }: ICreateFormProps) => {
  const { loading, getDetail, data, updateData } = useUpdateData();
  const handleSubmit = async (values: CreateFormValues) => {
    const request = { ...values, id: id };
    if (id) {
      await updateData(request);
    }
    onSubmit(request);
  };

  const initialValues: CreateFormValues = useMemo(() => {
    if (data) {
      return {
        name: data.name || "",
      };
    }

    return {
      name: "",
    };
  }, [data]);

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
        {({ errors, touched, handleChange, values, dirty }) => (
          <Form noValidate>
            <Stack spacing={3}>
              {/* Name */}
              <TextField
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                fullWidth
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
