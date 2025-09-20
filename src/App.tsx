import AuthProvider from "@app/shared/ui/auth-provider";
import Routers from "@app/routes/routers";
import AppSnackbar from "@app/shared/ui/app-snackbar";
import { ThemeProvider } from "@mui/material";
import { theme } from "@app/shared/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routers />
        <AppSnackbar />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
