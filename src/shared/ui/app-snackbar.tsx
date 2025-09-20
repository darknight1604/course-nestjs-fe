import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { useAtom } from "jotai";
import { snackbarAtom } from "@app/shared/atoms/snackbar-atom";

const AppSnackbar = () => {
  const [snackbar, setSnackbar] = useAtom(snackbarAtom);

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar.open}
        onClose={handleClose}
        message={snackbar.message}
        autoHideDuration={1000}
      />
    </Box>
  );
};

export default AppSnackbar;
