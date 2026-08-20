import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import * as yup from "yup";
import { bookingSchema } from "../../validation/bookingSchema";

interface BookingState {
  hotelId: string;
  roomId: string;
  pricePerNight: string;
}

const BookingDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const state = location.state as
    | BookingState
    | undefined;

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [guests, setGuests] =
    useState(1);

  const [rooms, setRooms] =
    useState(1);

  // User opened /booking directly
  if (!state) {
    return (
      <main className="booking-page">
        <div className="booking-container">
          <div className="booking-empty">
            <h2>
              Booking information not found
            </h2>

            <p>
              Please select a room before
              starting your booking.
            </p>

            <button
              type="button"
              className="booking-button"
              onClick={() =>
                navigate("/hotels")
              }
            >
              Back to hotels
            </button>
          </div>
        </div>
      </main>
    );
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrors({});

    const bookingData = {
      hotelId: state.hotelId,
      roomId: state.roomId,
      checkIn,
      checkOut,
      guests,
      rooms,
      pricePerNight:
        state.pricePerNight,
    };

    try {
      const validatedData =
        await bookingSchema.validate(
          bookingData,
          {
            abortEarly: false,
          }
        );

      navigate(
        "/booking/summary",
        {
          state: validatedData,
        }
      );
    } catch (error) {
      if (
        error instanceof
        yup.ValidationError
      ) {
        const validationErrors: Record<
          string,
          string
        > = {};

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
      }
    }
  };

  return (
    <main className="booking-page">
      <div className="booking-container">

        {/* Back */}

        <button
          type="button"
          className="booking-back-button"
          onClick={() =>
            navigate(-1)
          }
        >
          ← Back
        </button>

        {/* Page Header */}

        <div className="booking-page-header">
          <h1>
            Booking Details
          </h1>

          <p>
            Enter your stay details
            to continue your booking.
          </p>
        </div>

        {/* Booking Content */}

        <div className="booking-content">

          {/* Form Card */}

          <section className="booking-card">

            <div className="booking-card-header">
              <h2>
                Your stay
              </h2>

              <p>
                Select your dates and
                number of guests.
              </p>
            </div>

            <form
              className="booking-form"
              onSubmit={handleSubmit}
            >

              {/* Dates */}

              <div className="booking-form-row">

                <div className="booking-field">
                  <label htmlFor="checkIn">
                    Check-in
                  </label>

                  <input
                    id="checkIn"
                    type="date"
                    value={checkIn}
                    onChange={(event) =>
                      setCheckIn(
                        event.target.value
                      )
                    }
                  />

                  {errors.checkIn && (
                    <span className="field-error">
                      {errors.checkIn}
                    </span>
                  )}
                </div>

                <div className="booking-field">
                  <label htmlFor="checkOut">
                    Check-out
                  </label>

                  <input
                    id="checkOut"
                    type="date"
                    value={checkOut}
                    onChange={(event) =>
                      setCheckOut(
                        event.target.value
                      )
                    }
                  />

                  {errors.checkOut && (
                    <span className="field-error">
                      {errors.checkOut}
                    </span>
                  )}
                </div>

              </div>

              {/* Guests / Rooms */}

              <div className="booking-form-row">

                <div className="booking-field">
                  <label htmlFor="guests">
                    Guests
                  </label>

                  <input
                    id="guests"
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(event) =>
                      setGuests(
                        Number(
                          event.target.value
                        )
                      )
                    }
                  />

                  {errors.guests && (
                    <span className="field-error">
                      {errors.guests}
                    </span>
                  )}
                </div>

                <div className="booking-field">
                  <label htmlFor="rooms">
                    Rooms
                  </label>

                  <input
                    id="rooms"
                    type="number"
                    min="1"
                    value={rooms}
                    onChange={(event) =>
                      setRooms(
                        Number(
                          event.target.value
                        )
                      )
                    }
                  />

                  {errors.rooms && (
                    <span className="field-error">
                      {errors.rooms}
                    </span>
                  )}
                </div>

              </div>

              {/* Continue */}

              <button
                type="submit"
                className="booking-button"
              >
                Continue
              </button>

            </form>
          </section>

          {/* Booking Summary */}

          <aside className="booking-summary-card">

            <div className="summary-header">
              <span>
                Your selection
              </span>
            </div>

            <div className="summary-room">
              <div className="summary-room-icon">
                🏨
              </div>

              <div>
                <h3>
                  Selected Room
                </h3>

                <p>
                  Room selected for
                  your stay
                </p>
              </div>
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>
                Price per night
              </span>

              <strong>
                ₹{state.pricePerNight}
              </strong>
            </div>

            <div className="summary-row">
              <span>
                Guests
              </span>

              <strong>
                {guests}
              </strong>
            </div>

            <div className="summary-row">
              <span>
                Rooms
              </span>

              <strong>
                {rooms}
              </strong>
            </div>

            <div className="summary-note">
              <span>🔒</span>

              <p>
                Your booking details
                are secure.
              </p>
            </div>

          </aside>

        </div>
      </div>
    </main>
  );
};

export default BookingDetailsPage;