import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import type {
  Booking,
} from "../../api/booking.api";

import "./BookingConfirmationPage.css";

interface BookingConfirmationState {
  booking: Booking;
}

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state =
    location.state as
      | BookingConfirmationState
      | undefined;

  if (!state?.booking) {
    return (
      <main className="confirmation-page">
        <div className="confirmation-card">
          <h2>
            Booking information not found
          </h2>

          <p>
            We couldn't find your booking
            details.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/hotels")
            }
          >
            Browse Hotels
          </button>
        </div>
      </main>
    );
  }

  const { booking } = state;

  return (
    <main className="confirmation-page">
      <div className="confirmation-container">

        {/* Success */}

        <section className="confirmation-success">
          <div className="success-icon">
            ✓
          </div>

          <h1>
            Booking Confirmed!
          </h1>

          <p>
            Your hotel booking has been
            successfully created.
          </p>

          <div className="booking-number">
            <span>
              Booking Number
            </span>

            <strong>
              {booking.bookingNumber}
            </strong>
          </div>
        </section>

        {/* Booking Details */}

        <section className="confirmation-card">

          <div className="section-header">
            <h2>
              Booking Details
            </h2>

            <span
              className={`booking-status ${booking.status}`}
            >
              {booking.status}
            </span>
          </div>

          <div className="details-grid">

            <div className="detail-item">
              <span>
                Check-in
              </span>

              <strong>
                {booking.checkIn}
              </strong>
            </div>

            <div className="detail-item">
              <span>
                Check-out
              </span>

              <strong>
                {booking.checkOut}
              </strong>
            </div>

            <div className="detail-item">
              <span>
                Guests
              </span>

              <strong>
                {booking.guests}
              </strong>
            </div>

            <div className="detail-item">
              <span>
                Rooms
              </span>

              <strong>
                {booking.rooms}
              </strong>
            </div>

          </div>

        </section>

        {/* Price */}

        <section className="confirmation-card">

          <h2>
            Payment Summary
          </h2>

          <div className="price-row">
            <span>
              Price per night
            </span>

            <strong>
              ₹
              {booking.pricePerNight.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <div className="price-row">
            <span>
              Nights
            </span>

            <strong>
              {booking.totalNights}
            </strong>
          </div>

          <div className="price-row">
            <span>
              Subtotal
            </span>

            <strong>
              ₹
              {booking.subtotal.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <div className="price-row">
            <span>
              Taxes
            </span>

            <strong>
              ₹
              {booking.taxes.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <div className="price-row total-row">
            <span>
              Total Amount
            </span>

            <strong>
              ₹
              {booking.totalAmount.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <div className="payment-status">
            Payment Status:{" "}
            <strong>
              {booking.paymentStatus}
            </strong>
          </div>

        </section>

        {/* Actions */}

        <div className="confirmation-actions">

          <button
            type="button"
            className="primary-action"
            onClick={() =>
              navigate("/bookings")
            }
          >
            View My Bookings
          </button>

          <button
            type="button"
            className="secondary-action"
            onClick={() =>
              navigate("/hotels")
            }
          >
            Browse More Hotels
          </button>

        </div>

      </div>
    </main>
  );
};

export default BookingConfirmationPage;