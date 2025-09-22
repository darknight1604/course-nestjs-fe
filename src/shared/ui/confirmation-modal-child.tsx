import { Button, Stack, Typography } from "@mui/material";

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmBtnColor?: "error" | "info" | "success" | "primary";
}

export const ConfirmationModalChild = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmBtnColor = "primary",
}: ConfirmDialogProps) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">{message}</Typography>
      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        <Button variant="contained" color={confirmBtnColor} onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
};

export default ConfirmationModalChild;
