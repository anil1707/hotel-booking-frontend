import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useBookingById,
} from "../../features/booking/useBooking";

import "./BookingDetailPage.css";

const BookingDetailPage = () => {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const {
    data,
    isLoading,
    isError,
  } = useBookingById(id ?? "");

  if (isLoading) {
    return (
      <main className="booking-detail-page">
        <div className="booking-detail-container">
          <div className="booking-detail-loading">
            Loading booking details...
          </div>
        </div>
      </main>
    );
  }

  if (
    isError ||
    !data?.success ||
    !data.data
  ) {
    return (
      <main className="booking-detail-page">
        <div className="booking-detail-container">
          <div className="booking-detail-error">
            <h2>
              Booking not found
            </h2>

            <p>
              We couldn't load this booking.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/bookings")
              }
            >
              Back to My Bookings
            </button>
          </div>
        </div>
      </main>
    );
  }

  const booking = data.data;

  return (
    <main className="booking-detail-page">
      <div className="booking-detail-container">

        {/* Back */}

        <button
          type="button"
          className="back-button"
          onClick={() =>
            navigate("/bookings")
          }
        >
          ← Back to My Bookings
        </button>

        {/* Header */}

        <div className="booking-detail-header">
          <div>
            <span className="booking-label">
              Booking Number
            </span>

            <h1>
              {booking.bookingNumber}
            </h1>
          </div>

          <span
            className={`booking-status ${booking.status}`}
          >
            {booking.status}
          </span>
        </div>

        {/* Stay Details */}

        <section className="detail-card">

          <h2>
            Stay Details
          </h2>

          <div className="detail-grid">

            <div className="detail-item">
              <span>
                Check-in
              </span>

              <strong>
                {formatDate(
                  booking.checkIn
                )}
              </strong>
            </div>

            <div className="detail-item">
              <span>
                Check-out
              </span>

              <strong>
                {formatDate(
                  booking.checkOut
                )}
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

        {/* Booking Information */}

        <section className="detail-card">

          <h2>
            Booking Information
          </h2>

          <div className="detail-grid">

            <div className="detail-item">
              <span>
                Booking Status
              </span>

              <strong className="capitalize">
                {booking.status}
              </strong>
            </div>

            <div className="detail-item">
              <span>
                Payment Status
              </span>

              <strong className="capitalize">
                {booking.paymentStatus}
              </strong>
            </div>

            <div className="detail-item">
              <span>
                Booking Date
              </span>

              <strong>
                {formatDateTime(
                  booking.createdAt
                )}
              </strong>
            </div>

            <div className="detail-item">
              <span>
                Total Nights
              </span>

              <strong>
                {booking.totalNights}
              </strong>
            </div>

          </div>

        </section>

        {/* Price Details */}

        <section className="detail-card">

          <h2>
            Price Details
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
              Rooms
            </span>

            <strong>
              {booking.rooms}
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

        </section>

        {/* Payment */}

        <section className="detail-card">

          <div className="payment-box">

            <div>
              <span>
                Payment Status
              </span>

              <strong
                className={`payment-status ${booking.paymentStatus}`}
              >
                {booking.paymentStatus}
              </strong>
            </div>

            <div>
              <span>
                Amount
              </span>

              <strong>
                ₹
                {booking.totalAmount.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

const formatDate = (
  date: string
) => {
  return new Date(
    date
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const formatDateTime = (
  date: string
) => {
  return new Date(
    date
  ).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

export default BookingDetailPage;