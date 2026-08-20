import {
  useNavigate,
} from "react-router-dom";

import {
  useCancelBooking,
  useMyBookings,
} from "../../features/booking/useBooking";

import "./MyBookingsPage.css";
import { useState } from "react";
import ConfirmationModal from "../../components/common/ confirmationModal/ConfirmationModal";

const MyBookingsPage = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useMyBookings();

  const {
    mutateAsync: cancelBooking,
    isPending: isCancelling,
  } =
    useCancelBooking();

  const [selectedBookingId, setSelectedBookingId] =
    useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleCancelClick = (
    bookingId: string
  ) => {
    setIsOpen(true)
    setSelectedBookingId(
      bookingId
    );
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingId) {
      return;
    }

    try {
      await cancelBooking(
        selectedBookingId
      );

      setSelectedBookingId(null);
      setIsOpen(false)
    } catch (error) {
      console.error(
        "Cancel booking failed:",
        error
      );
    }
  };

  const bookings =
    data?.data ?? [];

  if (isLoading) {
    return (
      <main className="my-bookings-page">
        <div className="my-bookings-container">

          <div className="page-header">
            <h1>My Bookings</h1>

            <p>
              Manage your hotel bookings
            </p>
          </div>

          <div className="bookings-loading">
            Loading your bookings...
          </div>

        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="my-bookings-page">
        <div className="my-bookings-container">

          <div className="page-header">
            <h1>My Bookings</h1>
          </div>

          <div className="bookings-error">
            <h2>
              Unable to load bookings
            </h2>

            <p>
              Something went wrong while
              loading your bookings.
            </p>

            <button
              type="button"
              onClick={() =>
                refetch()
              }
            >
              Try Again
            </button>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="my-bookings-page">
      <div className="my-bookings-container">

        {/* Header */}

        <div className="page-header">
          <div>
            <h1>
              My Bookings
            </h1>

            <p>
              Manage your hotel bookings
            </p>
          </div>

          <span className="booking-count">
            {bookings.length}{" "}
            {bookings.length === 1
              ? "Booking"
              : "Bookings"}
          </span>
        </div>

        {/* Empty State */}

        {bookings.length === 0 ? (
          <div className="empty-bookings">

            <div className="empty-icon">
              🏨
            </div>

            <h2>
              No bookings yet
            </h2>

            <p>
              You haven't made any hotel
              bookings yet.
            </p>

            <button
              type="button"
              className="browse-hotels-button"
              onClick={() =>
                navigate("/hotels")
              }
            >
              Browse Hotels
            </button>

          </div>
        ) : (
          <div className="bookings-list">

            {bookings.map(
              (booking) => (
                <article
                  key={booking._id}
                  className="booking-card"
                >

                  {/* Booking Header */}

                  <div className="booking-card-header">

                    <div>
                      <span className="booking-label">
                        Booking Number
                      </span>

                      <h2>
                        {booking.bookingNumber}
                      </h2>
                    </div>

                    <span
                      className={`booking-status ${booking.status}`}
                    >
                      {booking.status}
                    </span>

                  </div>

                  {/* Stay Details */}

                  <div className="booking-details">

                    <div className="booking-detail">
                      <span>
                        Check-in
                      </span>

                      <strong>
                        {formatDate(
                          booking.checkIn
                        )}
                      </strong>
                    </div>

                    <div className="booking-detail">
                      <span>
                        Check-out
                      </span>

                      <strong>
                        {formatDate(
                          booking.checkOut
                        )}
                      </strong>
                    </div>

                    <div className="booking-detail">
                      <span>
                        Guests
                      </span>

                      <strong>
                        {booking.guests}
                      </strong>
                    </div>

                    <div className="booking-detail">
                      <span>
                        Rooms
                      </span>

                      <strong>
                        {booking.rooms}
                      </strong>
                    </div>

                  </div>

                  {/* Footer */}

                  <div className="booking-card-footer">

                    <div>
                      <span>
                        Total Amount
                      </span>

                      <strong className="booking-total">
                        ₹
                        {booking.totalAmount.toLocaleString(
                          "en-IN"
                        )}
                      </strong>
                    </div>

                    <div className="booking-actions">

                      <span
                        className={`payment-status ${booking.paymentStatus}`}
                      >
                        Payment:{" "}
                        {booking.paymentStatus}
                      </span>

                      <button
                        type="button"
                        className="view-booking-button"
                        onClick={() =>
                          navigate(
                            `/bookings/${booking._id}`
                          )
                        }
                      >
                        View Details
                      </button>

                      <button
                        type="button"
                        className="cancel-booking-button"
                        onClick={() =>
                          handleCancelClick(booking._id)
                        }
                        disabled={
                          booking.status === "cancelled" ||
                          isCancelling
                        }
                      >
                        {isCancelling &&
                          selectedBookingId === booking._id
                          ? "Cancelling..."
                          : "Cancel Booking"}
                      </button>

                      {/* {booking.status === "completed" && ( */}
                        <button
                          type="button"
                          className="write-review-button"
                          onClick={() =>
                            navigate(
                              `/hotels/${booking.hotelId._id}/review`,
                              {
                                state: {
                                  bookingId: booking._id,
                                  hotelId: booking.hotelId._id,
                                },
                              }
                            )
                          }
                        >
                          Write Review
                        </button>
                      {/* )} */}

                    </div>

                  </div>

                </article>
              )
            )}

          </div>
        )}

      </div>
      <ConfirmationModal
        isOpen={isOpen}
        title="Cancel Booking?"
        message="Are you sure you want to cancel this booking?"
        confirmText="Yes, Cancel Booking"
        cancelText="No, Keep Booking"
        onConfirm={handleCancelBooking}
        onCancel={() => { setIsOpen(prev => !prev) }}
        isLoading={isCancelling}
      />
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

export default MyBookingsPage;