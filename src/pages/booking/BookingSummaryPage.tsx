import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useCheckAvailability,
  useCreateBooking,
} from "../../features/booking/useBooking";

import {
  useAppSelector,
} from "../../store/hooks";

interface Availability {
  available: boolean;
  availableRooms: number;
  pricePerNight: number;
  totalNights: number;
  subtotal: number;
  taxes: number;
  totalAmount: number;
}

export interface BookingSummaryState {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  availability?: Availability;
}

const BookingSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    mutateAsync: checkAvailability,
    isPending,
  } = useCheckAvailability();

  const {
    mutateAsync: createBooking,
    isPending: isCreatingBooking,
  } = useCreateBooking();


  const {
    isAuthenticated,
  } = useAppSelector(
    (state) => state.auth
  );

  const state =
    location.state as
      | BookingSummaryState
      | undefined;

  /*
   * Booking state is missing.
   */
  if (!state) {
    return (
      <main className="booking-page">
        <div className="booking-container">

          <h1>
            Booking information not found
          </h1>

          <p>
            Please select a room before
            continuing.
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
      </main>
    );
  }

  /*
   * Check room availability.
   */
  const handleCheckAvailability =
    async () => {
      try {
        const response =
          await checkAvailability({
            hotelId:
              state.hotelId,

            roomId:
              state.roomId,

            checkIn:
              state.checkIn,

            checkOut:
              state.checkOut,

            guests:
              state.guests,

            rooms:
              state.rooms,
          });

        if (!response.success) {
          return;
        }

        /*
         * Update the current booking
         * state with availability data.
         */
        navigate(
          "/booking/summary",
          {
            replace: true,

            state: {
              ...state,

              availability:
                response.data,
            },
          }
        );

      } catch (error) {
        console.error(
          "Availability check failed:",
          error
        );
      }
    };

  const availability =
    state.availability;

  /*
   * Confirm booking.
   *
   * If user is not logged in,
   * redirect to login and preserve
   * the complete booking state.
   */
  const handleConfirmBooking = async () => {
  if (!isAuthenticated) {
    navigate("/login", {
      state: {
        from: "/booking/summary",

        booking: {
          ...state,
          availability,
        },
      },
    });

    return;
  }

  try {
    const response = await createBooking({
      hotelId: state.hotelId,
      roomId: state.roomId,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      guests: state.guests,
      rooms: state.rooms,
    });

    if (!response.success) {
      return;
    }

    /*
     * Pass complete booking object
     * to confirmation page.
     */
    navigate(
      `/booking/confirmation/${response.data._id}`,
      {
        replace: true,
        state: {
          booking: response.data,
        },
      }
    );
  } catch (error) {
    console.error(
      "Booking creation failed:",
      error
    );
  }
};

  return (
    <main className="booking-page">

      <div className="booking-container">

        {/* =========================
            Header
        ========================== */}

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
            Booking Summary
          </h1>

          <p>
            Review your booking details
            before continuing.
          </p>

        </div>

        {/* =========================
            Stay Details
        ========================== */}

        <section className="booking-section">

          <h2>
            Stay Details
          </h2>

          <div className="booking-info-grid">

            <div>
              <span>
                Check-in
              </span>

              <strong>
                {state.checkIn}
              </strong>
            </div>

            <div>
              <span>
                Check-out
              </span>

              <strong>
                {state.checkOut}
              </strong>
            </div>

            <div>
              <span>
                Guests
              </span>

              <strong>
                {state.guests}
              </strong>
            </div>

            <div>
              <span>
                Rooms
              </span>

              <strong>
                {state.rooms}
              </strong>
            </div>

          </div>

        </section>

        {/* =========================
            Price Details
        ========================== */}

        {availability && (
          <section className="booking-section">

            <h2>
              Price Details
            </h2>

            <div className="summary-row">

              <span>
                Price per night
              </span>

              <strong>
                ₹
                {availability.pricePerNight}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Nights
              </span>

              <strong>
                {availability.totalNights}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹
                {availability.subtotal}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Taxes
              </span>

              <strong>
                ₹
                {availability.taxes}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Total
              </span>

              <strong>
                ₹
                {availability.totalAmount}
              </strong>

            </div>

          </section>
        )}

        {/* =========================
            Availability
        ========================== */}

        {availability && (
          <section className="booking-section">

            {availability.available ? (

              <div>

                <h3>
                  Room Available ✓
                </h3>

                <p>
                  {
                    availability.availableRooms
                  }{" "}
                  room(s) available.
                </p>

              </div>

            ) : (

              <div>

                <h3>
                  Room Not Available
                </h3>

                <p>
                  The selected room is
                  currently unavailable
                  for these dates.
                </p>

              </div>

            )}

          </section>
        )}

        {/* =========================
            Check Availability
        ========================== */}

        {!availability && (

          <button
            type="button"
            className="continue-booking-button"
            disabled={isPending}
            onClick={
              handleCheckAvailability
            }
          >
            {isPending
              ? "Checking..."
              : "Check Availability"}
          </button>

        )}

        {/* =========================
            Confirm Booking
        ========================== */}

        {availability?.available && (

          <button
            type="button"
            className="continue-booking-button"
            onClick={
              handleConfirmBooking
            }
          >
            {!isCreatingBooking ? "Confirm Booking" : "Confirming..." }
          </button>

        )}

      </div>

    </main>
  );
};

export default BookingSummaryPage;