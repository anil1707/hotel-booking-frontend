import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import * as yup from "yup";



import "../../../styles/owner/owner-auth.css";
import { useAppDispatch } from "../../../store/hooks";
import { useLogin } from "../../../features/auth/useAuth";
import type { LoginPayload } from "../../../types/auth";
import { loginSchema } from "../../../validation/auth.schema";
import { login } from "../../../store/slices/authSlice";

const OwnerLoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    mutateAsync: loginUser,
    isPending,
  } = useLogin();

  const [formData, setFormData] =
    useState<LoginPayload>({
      email: "",
      password: "",
    });

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [serverError, setServerError] =
    useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrors({});
    setServerError("");

    try {
      const validatedData =
        await loginSchema.validate(
          formData,
          {
            abortEarly: false,
          }
        );

      const response =
        await loginUser(
          validatedData
        );

      const user =
        response.data.user;

      if (
        !user.roles.includes(
          "hotel_owner"
        )
      ) {
        setServerError(
          "You don't have owner access."
        );

        return;
      }

      dispatch(
        login({
          user,
          token:
            response.data.token,
        })
      );

      navigate("/owner", {
        replace: true,
      });

    } catch (error) {
      if (
        error instanceof
        yup.ValidationError
      ) {
        const validationErrors:
          Record<string, string> = {};

        error.inner.forEach(
          (validationError) => {
            if (
              validationError.path
            ) {
              validationErrors[
                validationError.path
              ] =
                validationError.message;
            }
          }
        );

        setErrors(
          validationErrors
        );

        return;
      }

      setServerError(
        "Invalid email or password."
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">
          <h1>
            Owner Login
          </h1>

          <p>
            Login to manage your
            hotel.
          </p>
        </div>

        {serverError && (
          <div className="auth-error">
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              placeholder="Enter your email"
              autoComplete="email"
            />

            {errors.email && (
              <span className="field-error">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            {errors.password && (
              <span className="field-error">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isPending}
          >
            {isPending
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          <span>
            Don't have an owner
            account?
          </span>

          <Link to="/owner/register">
            Register as a hotel owner
          </Link>
        </div>

        <div className="auth-footer">
          <span>
            Are you a customer?
          </span>

          <Link to="/login">
            Customer Login
          </Link>
        </div>

      </div>

    </div>
  );
};

export default OwnerLoginPage;