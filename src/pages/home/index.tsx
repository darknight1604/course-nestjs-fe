import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { lazy, Suspense } from "react";
import { styles } from "./styles";
import { useNavigate } from "react-router";
import { routePaths } from "@app/config/route-paths";

const HomePage = () => {
  const navigate = useNavigate();
  const WorkingAnimation = lazy(
    () => import("@app/shared/ui/working-animation.lottie")
  );
  const redirectToLoginPage = () => {
    navigate(routePaths.login.path);
  };

  return (
    <Box sx={styles.container}>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Button variant="text" onClick={redirectToLoginPage}>
          Login
        </Button>
      </Stack>
      <Typography>Feature under development...</Typography>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Suspense fallback={<LinearProgress />}>
          <WorkingAnimation />
        </Suspense>
      </Box>
    </Box>
  );
};

export default HomePage;
