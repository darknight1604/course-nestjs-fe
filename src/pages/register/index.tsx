import { RegisterForm } from "@app/features/register/ui";
import { Box, Container, Typography } from "@mui/material";
import { styles } from "./styles";

const RegisterPage = () => {
  return (
    <Container maxWidth="xs">
      <Box sx={styles.container}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <RegisterForm />
      </Box>
    </Container>
  );
};

export default RegisterPage;
