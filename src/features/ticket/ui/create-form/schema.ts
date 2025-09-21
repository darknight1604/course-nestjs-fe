import { TICKET_STATUS } from "@app/config/contants";
import * as Yup from "yup";

export const createTicketSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().optional(),
  status: Yup.mixed<TICKET_STATUS>()
    .oneOf(Object.values(TICKET_STATUS))
    .required("Status is required"),
});
