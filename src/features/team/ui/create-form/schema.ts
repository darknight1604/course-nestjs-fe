import * as Yup from "yup";

export const createSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});
