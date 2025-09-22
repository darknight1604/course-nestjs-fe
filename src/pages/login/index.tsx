import LoginForm from "@app/features/login/ui/login-form";
import { authAtom } from "@app/shared/atoms/auth-atom";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { styles } from "./styles";
import { routePaths } from "@app/config/route-paths";
import { Home } from "@mui/icons-material";

const LoginPage = () => {
  const auth = useAtomValue(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate(routePaths.admin.path);
    }
  }, [auth, navigate]);

  return (
    <Container maxWidth="xs">
      <Box sx={styles.container}>
        {/* Back home button + title */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mb: 2, width: "100%" }}
        >
          <IconButton onClick={() => navigate(routePaths.home.path)}>
            <Home color="primary" />
          </IconButton>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
        </Stack>

        <LoginForm />
      </Box>
    </Container>
  );
};
export default LoginPage;
