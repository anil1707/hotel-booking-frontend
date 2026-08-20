import type { ApiError } from "../types/api";

export const getApiErrorMessage = (
  error: unknown
): string => {
  const apiError =
    error as ApiError;

  return (
    apiError.response?.data?.message ||
    "Something went wrong. Please try again."
  );
};