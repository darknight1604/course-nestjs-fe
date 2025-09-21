import { TICKET_STATUS } from "@app/config/contants";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { createTicketSchema } from "./schema";

interface CreateTicketFormValues {
  title: string;
  description: string;
  status: TICKET_STATUS;
}

const initialValues: CreateTicketFormValues = {
  title: "",
  description: "",
  status: TICKET_STATUS.NEW,
};

interface ICreateTicketFormProps {
  onSubmit: (values: CreateTicketFormValues) => void;
}

export const CreateTicketForm = ({ onSubmit }: ICreateTicketFormProps) => {
  const handleSubmit = (values: CreateTicketFormValues) => {
    onSubmit(values);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create Ticket
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={createTicketSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form noValidate>
            <Stack spacing={3}>
              {/* Title */}
              <TextField
                name="title"
                label="Title"
                value={values.title}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                fullWidth
              />

              {/* Description */}
              <TextField
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
              />

              {/* Status */}
              <TextField
                select
                name="status"
                label="Status"
                value={values.status}
                onChange={handleChange}
                error={touched.status && Boolean(errors.status)}
                helperText={touched.status && errors.status}
                fullWidth
              >
                {Object.values(TICKET_STATUS).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>

              {/* Actions */}
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button type="reset" variant="outlined">
                  Reset
                </Button>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
