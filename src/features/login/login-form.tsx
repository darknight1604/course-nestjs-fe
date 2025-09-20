import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useLogin } from "./hooks/use-login";
import { routePaths } from "@app/config/route-paths";

// ✅ Yup validation schema
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const { loading, login } = useLogin();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        login(values, () => {
          navigate(routePaths.admin.path);
        });
      } catch (err) {
        console.error(err);
        setError("Login failed");
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        id="username"
        name="username"
        label="Username"
        margin="normal"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />

      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        margin="normal"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Login"}
      </Button>
    </Box>
  );
};

export default LoginForm;
