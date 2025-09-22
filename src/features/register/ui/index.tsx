import { routePaths } from "@app/config/route-paths";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import useCreateUser from "../hooks";

// ✅ Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "At least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

// ✅ Form initial values
interface RegisterFormValues {
  username: string;
  password: string;
  rePassword: string;
}

const initialValues: RegisterFormValues = {
  username: "",
  password: "",
  rePassword: "",
};

export const RegisterForm: React.FC = () => {
  const { loading, createUser } = useCreateUser();
  const navigate = useNavigate();
  const handleSubmit = async (values: RegisterFormValues) => {
    createUser(values, () => {
      navigate(routePaths.login.path);
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        id="username"
        label="Username"
        name="username"
        margin="normal"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />

      <TextField
        fullWidth
        type="password"
        label="Password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        margin="normal"
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      <TextField
        fullWidth
        type="password"
        label="Confirm Password"
        name="rePassword"
        margin="normal"
        value={formik.values.rePassword}
        onChange={formik.handleChange}
        error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
        helperText={formik.touched.rePassword && formik.errors.rePassword}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Sign up"}
      </Button>
    </Box>
  );
};
