import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { Box, Typography } from "@mui/material";

interface EmptyStateProps {
  message?: string;
}

const EmptySearchingData = ({
  message = "No data found.",
}: EmptyStateProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      py={6}
    >
      <SearchOffOutlinedIcon sx={{ fontSize: 60, color: "grey.400", mb: 2 }} />
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {message}
      </Typography>
    </Box>
  );
};

export default EmptySearchingData;
