// GlobalModal.tsx
import { useAtom } from "jotai";
import { Modal, Box } from "@mui/material";
import { modalContentAtom, modalOpenAtom } from "../atoms";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
};

export const AppModal = () => {
  const [open, setOpen] = useAtom(modalOpenAtom);
  const [content, setContent] = useAtom(modalContentAtom);

  const handleClose = () => {
    setOpen(false);
    setContent(null);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>{content}</Box>
    </Modal>
  );
};
