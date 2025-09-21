import { TICKET_STATUS } from "@app/config/contants";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useMemo } from "react";
import useUpdateTicket from "../../hooks/use-update-ticket";
import { createTicketSchema } from "./schema";

interface CreateTicketFormValues {
  id?: number;
  title: string;
  description: string;
  status: TICKET_STATUS;
}

interface ICreateTicketFormProps {
  onSubmit: (values: CreateTicketFormValues) => void;
  ticketId?: number;
}

export const CreateTicketForm = ({
  onSubmit,
  ticketId,
}: ICreateTicketFormProps) => {
  const { loading, getTicket, ticket, updateTicket } = useUpdateTicket();
  const handleSubmit = async (values: CreateTicketFormValues) => {
    const request = { ...values, id: ticketId };
    if (ticketId) {
      await updateTicket(request);
    }
    onSubmit(request);
  };

  const initialValues: CreateTicketFormValues = useMemo(() => {
    if (ticket) {
      return {
        title: ticket.title || "",
        description: ticket.description || "",
        status: (ticket.status as TICKET_STATUS) || TICKET_STATUS.NEW,
      };
    }

    return {
      title: "",
      description: "",
      status: TICKET_STATUS.NEW,
    };
  }, [ticket]);

  useEffect(() => {
    if (!ticketId) {
      return;
    }
    getTicket(ticketId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (ticketId && !ticket) {
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
        {ticketId ? "Edit Ticket" : "Create Ticket"}
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={createTicketSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, handleChange, values, dirty }) => (
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
                <Button type="reset" variant="outlined" disabled={loading}>
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading || !dirty}
                >
                  {ticketId ? "Update" : "Create"}
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
