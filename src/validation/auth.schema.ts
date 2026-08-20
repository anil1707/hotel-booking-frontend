import * as yup from "yup";

export const registerSchema =
  yup.object({
    name: yup
      .string()
      .trim()
      .required("Name is required")
      .min(
        2,
        "Name must be at least 2 characters"
      ),

    email: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .required("Email is required"),

    password: yup
      .string()
      .required("Password is required")
      .min(
        6,
        "Password must be at least 6 characters"
      ),
  });

export const loginSchema =
  yup.object({
    email: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .required("Email is required"),

    password: yup
      .string()
      .required("Password is required"),
  });