import { atom } from "jotai";

export interface SnackbarState {
  open: boolean;
  message: string;
}

export const snackbarAtom = atom<SnackbarState>({
  open: false,
  message: "",
});
