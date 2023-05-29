export type User = {
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  email: string;
  emailVerification: boolean;
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: Record<string, unknown>;
  registration: string;
  status: boolean;
};

export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_USER = "SET_USER";

export interface UserState {
  isLoading: boolean;
  isError: boolean;
  user: User | null;
}

export type UserAction =
  | { type: "SET_LOADING" }
  | { type: "SET_ERROR" }
  | { type: "SET_USER"; payload: User | null };
