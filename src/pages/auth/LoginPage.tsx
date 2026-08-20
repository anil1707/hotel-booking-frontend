import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import * as yup from "yup";

import { loginSchema } from "../../validation/auth.schema";

import {
  useAppDispatch,
} from "../../store/hooks";

import {
  login,
} from "../../store/slices/authSlice";

import type { LoginPayload } from "../../types/auth";

import "./AuthPage.css";
import { useLogin } from "../../features/auth/useAuth";

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

interface LoginLocationState {
  message?: string;
  from?: string;
  booking?: BookingSummaryState;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const loginState =
    location.state as
      | LoginLocationState
      | null;

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

      dispatch(
        login({
          user: response.data.user,
          token: response.data.token,
        })
      );

      /*
       * If user came from booking,
       * return to booking summary.
       */
      if (
        loginState?.from &&
        loginState?.booking
      ) {
        navigate(
          loginState.from,
          {
            replace: true,
            state:
              loginState.booking,
          }
        );

        return;
      }

      /*
       * Normal login.
       */
      navigate("/", {
        replace: true,
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
        "Invalid email or password."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <h1>Welcome Back</h1>

          <p>
            Login to continue booking
            your stay.
          </p>
        </div>

        {/* Registration success */}

        {loginState?.message && (
          <div className="auth-success">
            {loginState.message}
          </div>
        )}

        {/* Login error */}

        {serverError && (
          <div className="auth-error">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit}>

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
              placeholder="Enter your password"
              autoComplete="current-password"
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
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <span>
            Don't have an account?
          </span>

          <Link to="/register" state={loginState}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;