import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import * as yup from "yup";
import { bookingSchema } from "../../validation/bookingSchema";


interface BookingState {
  hotelId: string;
  roomId: string;
  pricePerNight: string;
}

const BookingDetailsPage = () => {
  const location =
    useLocation();

  const navigate =
    useNavigate();

    const [errors, setErrors] = useState<
  Record<string, string>
>({});

  const state =
    location.state as
      | BookingState
      | undefined;

  const [
    checkIn,
    setCheckIn,
  ] = useState("");

  const [
    checkOut,
    setCheckOut,
  ] = useState("");

  const [
    guests,
    setGuests,
  ] = useState(1);

  const [
    rooms,
    setRooms,
  ] = useState(1);

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
    pricePerNight: state.pricePerNight
  };

  try {
    const validatedData =
      await bookingSchema.validate(
        bookingData,
        {
          abortEarly: false,
        }
      );

    console.log(
      "Validated booking:",
      validatedData
    );

    navigate("/booking/summary", {
      state: validatedData,
    });
  } catch (error) {
    if (
      error instanceof yup.ValidationError
    ) {
      const validationErrors: Record<
        string,
        string
      > = {};

      error.inner.forEach(
        (validationError) => {
          if (validationError.path) {
            validationErrors[
              validationError.path
            ] =
              validationError.message;
          }
        }
      );

      setErrors(validationErrors);
    }
  }
};

console.log("validaionds", errors)

  return (
    <main className="booking-page">
      <div className="booking-container">

        <div className="booking-header">

          <button
            type="button"
            className="back-link-button"
            onClick={() =>
              navigate(-1)
            }
          >
            ← Back
          </button>

          <h1>
            Booking Details
          </h1>

          <p>
            Enter your stay details
            to continue.
          </p>

        </div>

        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >

          {/* Check-in */}

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
              required
            />
            {errors.checkIn && (
    <span className="field-error">
      {errors.checkIn}
    </span>
  )}
          </div>

          {/* Check-out */}

          <div className="booking-field">
  <label htmlFor="checkOut">
    Check-out
  </label>

  <input
    id="checkOut"
    type="date"
    value={checkOut}
    onChange={(event) =>
      setCheckOut(event.target.value)
    }
  />

  {errors.checkOut && (
    <span className="field-error">
      {errors.checkOut}
    </span>
  )}
</div>

          {/* Guests */}

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
        Number(event.target.value)
      )
    }
  />

  {errors.guests && (
    <span className="field-error">
      {errors.guests}
    </span>
  )}
</div>

          {/* Rooms */}

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
        Number(event.target.value)
      )
    }
  />

  {errors.rooms && (
    <span className="field-error">
      {errors.rooms}
    </span>
  )}
</div>

          {/* Selected room */}

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
        Number(event.target.value)
      )
    }
  />

  {errors.rooms && (
    <span className="field-error">
      {errors.rooms}
    </span>
  )}
</div>

          {/* Submit */}

          <button
            type="submit"
            className="continue-booking-button"
          >
            Continue
          </button>

        </form>

      </div>
    </main>
  );
};

export default BookingDetailsPage;