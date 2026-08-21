// src/types/auth.ts

export type UserRole =
  | "customer"
  | "hotel_owner"
  | "admin";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  roles?: UserRole[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  roles: UserRole[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}