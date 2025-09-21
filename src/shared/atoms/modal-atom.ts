import { atom } from "jotai";

export const modalOpenAtom = atom(false);
export const modalContentAtom = atom<React.ReactNode | null>(null);
