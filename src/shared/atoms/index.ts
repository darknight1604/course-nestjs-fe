import { atom } from "jotai";

export * from "./auth-atom";
export * from "./modal-atom";

export const isLoggedOutAtom = atom(false);
