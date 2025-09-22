import { routePaths } from "@app/config/route-paths";
import { useLogout } from "@app/features/logout/hooks";
import { authAtom } from "@app/shared/atoms/auth-atom";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { lazy, Suspense, useMemo } from "react";
import { useNavigate } from "react-router";
import { styles } from "./styles";
import UserProfile from "@app/shared/ui/user-profile";

const WorkingAnimation = lazy(
  () => import("@app/shared/ui/working-animation.lottie")
);

const HomePage = () => {
  const { logout } = useLogout();
  const auth = useAtomValue(authAtom);
  const navigate = useNavigate();
  const isLogged = useMemo(() => !!auth, [auth]);

  const redirectToLoginPage = () => {
    if (isLogged) {
      logout(() => {
        navigate(routePaths.home.path, { replace: true });
      });
      return;
    }
    navigate(routePaths.login.path);
  };

  return (
    <Box sx={styles.container}>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <UserProfile />
        <Button variant="text" onClick={redirectToLoginPage}>
          {isLogged ? "Logout" : " Login"}
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
