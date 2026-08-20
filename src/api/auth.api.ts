

import type {
  RegisterPayload,
  LoginPayload,
  AuthResponse,
} from "../types/auth";
import api from "./axios";

export const registerUser = async (
  payload: RegisterPayload
) => {
  const response =
    await api.post<AuthResponse>(
      "/auth/register",
      payload
    );

  return response.data;
};

export const loginUser = async (
  payload: LoginPayload
) => {
  const response =
    await api.post<AuthResponse>(
      "/auth/login",
      payload
    );

  return response.data;
};