import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { registerSchema } from "../../validation/auth.schema";

import type { RegisterPayload } from "../../types/auth";

import "./AuthPage.css";
import { useRegister } from "../../features/auth/useAuth";


interface Availability {
  available: boolean;
  availableRooms: number;
  pricePerNight: number;
  totalNights: number;
  subtotal: number;
  taxes: number;
  totalAmount: number;
}

interface BookingSummaryState {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  availability?: Availability;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

const registerState = location.state as {
  from?: string;
  booking?: BookingSummaryState;
} | null;

  const {
    mutateAsync: registerUser,
    isPending,
  } = useRegister();

  

  const [formData, setFormData] =
    useState<RegisterPayload>({
      name: "",
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
    const { name, value } = event.target;

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
        await registerSchema.validate(
          formData,
          {
            abortEarly: false,
          }
        );

      await registerUser(validatedData);

      navigate("/login", {
        state: {
          message:
            "Registration successful. Please login.",
            ...registerState
        },
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<
          string,
          string
        > = {};

        error.inner.forEach(
          (validationError) => {
            if (validationError.path) {
              validationErrors[
                validationError.path
              ] = validationError.message;
            }
          }
        );

        setErrors(validationErrors);

        return;
      }

      setServerError(
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <h1>Create Account</h1>

          <p>
            Create an account to start
            booking hotels.
          </p>
        </div>

        {serverError && (
          <div className="auth-error">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <div className="form-group">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              autoComplete="name"
            />

            {errors.name && (
              <span className="field-error">
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
            />

            {errors.email && (
              <span className="field-error">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
            />

            {errors.password && (
              <span className="field-error">
                {errors.password}
              </span>
            )}
          </div>

          {/* Submit */}

          <button
            type="submit"
            className="auth-button"
            disabled={isPending}
          >
            {isPending
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;