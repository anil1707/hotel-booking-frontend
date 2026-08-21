import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import * as yup from "yup";

import "./../../../styles/owner/owner-auth.css";
import type { RegisterPayload } from "../../../types/auth";
import { useRegister } from "../../../features/auth/useAuth";



const OwnerRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    mutateAsync: registerOwner,
    isPending,
  } = useRegister();

  const [formData, setFormData] =
    useState<RegisterPayload>({
      name: "",
      email: "",
      password: "",
      roles: ['hotel_owner', 'customer']
    });

  const [confirmPassword, setConfirmPassword] =
    useState("");

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
      if (
        formData.password !==
        confirmPassword
      ) {
        setErrors({
          confirmPassword:
            "Passwords do not match.",
        });

        return;
      }

      const validatedData =
        await yup.object({
          name: yup
            .string()
            .required(
              "Name is required"
            ),

          email: yup
            .string()
            .email(
              "Enter a valid email"
            )
            .required(
              "Email is required"
            ),

          password: yup
            .string()
            .min(
              6,
              "Password must be at least 6 characters"
            )
            .required(
              "Password is required"
            ),
        }).validate(
          formData,
          {
            abortEarly: false,
          }
        );

      await registerOwner(
        validatedData
      );

      navigate(
        "/owner/login",
        {
          replace: true,
          state: {
            message:
              "Owner account created successfully. Please login.",
            from:
              location.pathname,
          },
        }
      );

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
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    }
  };

  return (
    <main className="owner-auth-page">

      <div className="owner-auth-card">

        <div className="owner-auth-brand">
          <h1>
            StayFinder
          </h1>

          <span>
            Hotel Owner Portal
          </span>
        </div>

        <div className="owner-auth-header">
          <h2>
            Create owner account
          </h2>

          <p>
            Start managing your hotel
            with StayFinder.
          </p>
        </div>

        {serverError && (
          <div className="owner-auth-error">
            {serverError}
          </div>
        )}

        <form
          className="owner-auth-form"
          onSubmit={handleSubmit}
        >

          {/* Name */}

          <div className="owner-auth-field">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />

            {errors.name && (
              <span className="field-error">
                {errors.name}
              </span>
            )}

          </div>

          {/* Email */}

          <div className="owner-auth-field">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <span className="field-error">
                {errors.email}
              </span>
            )}

          </div>

          {/* Password */}

          <div className="owner-auth-field">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />

            {errors.password && (
              <span className="field-error">
                {errors.password}
              </span>
            )}

          </div>

          {/* Confirm Password */}

          <div className="owner-auth-field">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={
                confirmPassword
              }
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
            />

            {errors.confirmPassword && (
              <span className="field-error">
                {
                  errors.confirmPassword
                }
              </span>
            )}

          </div>

          <button
            type="submit"
            className="owner-auth-button"
            disabled={isPending}
          >
            {isPending
              ? "Creating Account..."
              : "Create Owner Account"}
          </button>

        </form>

        <div className="owner-auth-footer">

          <span>
            Already have an account?
          </span>

          <Link to="/owner/login">
            Login
          </Link>

        </div>

        <div className="owner-auth-footer">

          <span>
            Are you a customer?
          </span>

          <Link to="/register">
            Customer Registration
          </Link>

        </div>

      </div>

    </main>
  );
};

export default OwnerRegisterPage;