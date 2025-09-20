import { atom } from "jotai";

export interface SnackbarState {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
}

export const snackbarAtom = atom<SnackbarState>({
  open: false,
  message: "",
  severity: "info",
});
