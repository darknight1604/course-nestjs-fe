import AuthProvider from "@app/shared/ui/auth-provider";
import Routers from "@app/routes/routers";
import AppSnackbar from "@app/shared/ui/app-snackbar";
import { ThemeProvider } from "@mui/material";
import { theme } from "@app/shared/theme";
import { AppModal } from "@app/shared/ui/app-modal";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routers />
        <AppSnackbar />
      </AuthProvider>
      <AppModal />
    </ThemeProvider>
  );
}

export default App;
