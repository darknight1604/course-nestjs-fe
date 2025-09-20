import AuthProvider from "@app/shared/ui/auth-provider";
import Routers from "@app/routes/routers";
import PositionedSnackbar from "@app/shared/ui/app-snackbar";

function App() {
  return (
    <AuthProvider>
      <Routers />
      <PositionedSnackbar />
    </AuthProvider>
  );
}

export default App;
