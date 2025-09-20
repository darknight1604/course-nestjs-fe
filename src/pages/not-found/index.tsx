// pages/NotFoundPage.tsx
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";
import { styles } from "./styles";

const NotFoundPage = () => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
