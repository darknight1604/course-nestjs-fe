import { Box, LinearProgress } from "@mui/material";
import { styles } from "./styles";

const LoadingPage = () => {
  return (
    <Box sx={styles.container}>
      <LinearProgress sx={styles.progressBar} />
    </Box>
  );
};

export default LoadingPage;
