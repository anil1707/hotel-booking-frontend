// src/store/slices/authSlice.ts

import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { User } from "../../types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const storedToken =
  localStorage.getItem("accessToken");

const storedUser =
  localStorage.getItem("user");

const initialState: AuthState = {
  user: storedUser
    ? JSON.parse(storedUser)
    : null,
  token: storedToken,
  isAuthenticated: Boolean(storedToken),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>
    ) => {
      const { user, token } =
        action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem(
        "accessToken",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem("user");
    },
  },
});

export const {
  login,
  logout,
} = authSlice.actions;

export default authSlice.reducer;