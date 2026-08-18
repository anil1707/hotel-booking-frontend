import {
  useLocation,
  useNavigate,
} from "react-router-dom"
import type { BookingSelection, BookingState } from "../../types/booking";
import { calculateNights } from "../../utils/date";



const BookingSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as | BookingState | undefined;

  if (!state) {
    return (
      <div className="page-state">
        <h2>
          Booking information not found
        </h2>

        <button
          type="button"
          onClick={() =>
            navigate("/hotels")
          }
        >
          Back to hotels
        </button>
      </div>
    );
  }

  const {
  hotelName,
  roomName,
  pricePerNight,
  checkIn,
  checkOut,
  guests,
  rooms,
} = state;

const nights =
  calculateNights(
    checkIn,
    checkOut
  );

const roomTotal =
  pricePerNight *
  nights *
  rooms;

  return (
  <main className="booking-page">
    <div className="booking-container">

      <h1>
        Booking Summary
      </h1>

      <div className="booking-summary">

        <section className="booking-section">
          <h2>
            Hotel
          </h2>

          <h3>
            {hotelName}
          </h3>

          <p>
            {roomName}
          </p>
        </section>

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
                {checkIn}
              </strong>
            </div>

            <div>
              <span>
                Check-out
              </span>

              <strong>
                {checkOut}
              </strong>
            </div>

            <div>
              <span>
                Guests
              </span>

              <strong>
                {guests}
              </strong>
            </div>

            <div>
              <span>
                Rooms
              </span>

              <strong>
                {rooms}
              </strong>
            </div>

            <div>
              <span>
                Nights
              </span>

              <strong>
                {nights}
              </strong>
            </div>
          </div>
        </section>

        <section className="booking-section">
          <h2>
            Price
          </h2>

          <div className="price-row">
            <span>
              ₹{pricePerNight} ×{" "}
              {nights} nights ×{" "}
              {rooms} room
            </span>

            <strong>
              ₹{roomTotal}
            </strong>
          </div>

          <div className="price-total">
            <span>
              Total
            </span>

            <strong>
              ₹{roomTotal}
            </strong>
          </div>
        </section>

        <button
          type="button"
          className="continue-booking-button"
        >
          Continue Booking
        </button>

      </div>
    </div>
  </main>
);
};

export default BookingSummaryPage;