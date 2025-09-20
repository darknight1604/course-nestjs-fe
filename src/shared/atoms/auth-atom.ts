import type { AuthResponse } from "@app/types";
import { atom } from "jotai";

type AuthState = AuthResponse;

export const authAtom = atom<AuthState>();
