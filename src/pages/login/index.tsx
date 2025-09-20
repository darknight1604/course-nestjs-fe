import LoginForm from "@app/features/login/ui/login-form";
import { authAtom } from "@app/shared/atoms/auth-atom";
import { Box, Container, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const auth = useAtomValue(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/admin");
    }
  }, [auth, navigate]);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <LoginForm />
      </Box>
    </Container>
  );
};
export default LoginPage;
