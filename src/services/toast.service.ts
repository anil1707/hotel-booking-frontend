export type ToastType = "success" | "error";

type ToastHandler = (
  message: string,
  type: ToastType
) => void;

let toastHandler: ToastHandler | null = null;

export const registerToastHandler = (
  handler: ToastHandler
) => {
  toastHandler = handler;
};

export const toast = {
  success: (message: string) => {
    toastHandler?.(message, "success");
  },

  error: (message: string) => {
    toastHandler?.(message, "error");
  },
};