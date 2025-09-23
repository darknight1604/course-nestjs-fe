import * as Yup from "yup";

export const createSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  teamId: Yup.number().required("Team is required"),
  teamName: Yup.string(),
  startDate: Yup.date().nullable().required("Start date is required"),
  endDate: Yup.date()
    .nullable()
    .min(Yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
});
