import * as Yup from "yup";

export const createSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});
