import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import HotelImageGallery from "../../components/hotel/HotelImageGallery";
import RoomCard from "../../components/hotel/RoomCard";

import {
  useHotel,
  useHotelRooms,
} from "../../features/hotels/useHotel";


import "./HotelDetailPage.css";
import { useAddFavorite, useFavorites, useRemoveFavorite } from "../../features/favorite/useFavorite";
import { useHotelReviews } from "../../features/review/useReview";
import ReviewList from "../../components/review/ReviewList";

const HotelDetailsPage = () => {
  const navigate = useNavigate();

  const { hotelId } =
    useParams<{
      hotelId: string;
    }>();

  const [searchParams] =
    useSearchParams();

  // --------------------------------
  // Booking details from Home search
  // --------------------------------

  const checkIn =
    searchParams.get("checkIn");

  const checkOut =
    searchParams.get("checkOut");

  const guests =
    searchParams.get("guests");

  const rooms =
    searchParams.get("rooms");

  // --------------------------------
  // Determine booking flow
  // --------------------------------

  const hasBookingDetails =
    Boolean(
      checkIn &&
        checkOut &&
        guests &&
        rooms
    );

  // --------------------------------
  // review
  // --------------------------------

    const {
  data: reviewsData,
  isLoading: reviewsLoading,
  isError: reviewsError,
} = useHotelReviews(
  hotelId ?? ""
);

const reviews =
  reviewsData?.data ?? [];

  // --------------------------------
  // Hotel
  // --------------------------------

  const {
    data: hotelData,
    isLoading: hotelLoading,
    isError: hotelError,
    error: hotelErrorObject,
  } = useHotel(hotelId ?? "");

  // --------------------------------
  // Rooms
  // --------------------------------

  const {
    data: roomsData,
    isLoading: roomsLoading,
    isError: roomsError,
  } = useHotelRooms(hotelId ?? "");

  // --------------------------------
  // Favorites
  // --------------------------------

  const {
    data: favoritesData,
  } = useFavorites();

  const {
    mutateAsync: addFavorite,
    isPending: isAddingFavorite,
  } = useAddFavorite();

  const {
    mutateAsync: removeFavorite,
    isPending: isRemovingFavorite,
  } = useRemoveFavorite();

  // --------------------------------
  // Hotel loading
  // --------------------------------

  if (hotelLoading) {
    return (
      <main className="hotel-details-page">
        <div className="page-state">
          <p>Loading hotel...</p>
        </div>
      </main>
    );
  }

  // --------------------------------
  // Hotel error
  // --------------------------------

  if (hotelError) {
    return (
      <main className="hotel-details-page">
        <div className="page-state error">
          <h2>
            Failed to load hotel
          </h2>

          <p>
            {hotelErrorObject instanceof
            Error
              ? hotelErrorObject.message
              : "Something went wrong"}
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

  // --------------------------------
  // Hotel data
  // --------------------------------

  const hotel =
    hotelData?.data;

  if (!hotel) {
    return (
      <main className="hotel-details-page">
        <div className="page-state">
          <h2>
            Hotel not found
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
      </main>
    );
  }

  const hotelRooms =
    roomsData?.data ?? [];

  // --------------------------------
  // Favorite status
  // --------------------------------

  const isFavorite =
    favoritesData?.data?.some(
      (favorite) =>
        favorite.hotelId._id ===
        hotel._id
    ) ?? false;

  const isFavoriteUpdating =
    isAddingFavorite ||
    isRemovingFavorite;

  // --------------------------------
  // Toggle favorite
  // --------------------------------

  const handleFavoriteToggle =
    async () => {
      if (!hotelId) {
        return;
      }

      try {
        if (isFavorite) {
          await removeFavorite(
            hotelId
          );
        } else {
          await addFavorite(
            hotelId
          );
        }
      } catch (error) {
        console.error(
          "Favorite action failed:",
          error
        );
      }
    };

  // --------------------------------
  // Select room
  // --------------------------------

  const handleSelectRoom = (
    room: any
  ) => {
    // --------------------------------
    // FLOW A
    // User came from Home search
    // Booking details already exist
    // --------------------------------

    if (hasBookingDetails) {
      navigate(
        "/booking/summary",
        {
          state: {
            hotelId:
              hotel._id,

            roomId:
              room?._id,

            checkIn,
            checkOut,

            guests: Number(
              guests
            ),

            rooms: Number(
              rooms
            ),

            pricePerNight:
              room?.pricePerNight,
          },
        }
      );

      return;
    }

    // --------------------------------
    // FLOW B
    // User came directly
    // Booking details don't exist
    // --------------------------------

    navigate(
      "/booking",
      {
        state: {
          hotelId:
            hotel._id,

          roomId:
            room?._id,

          pricePerNight:
            room?.pricePerNight,
        },
      }
    );
  };

  return (
    <main className="hotel-details-page">
      <div className="hotel-details-container">

        {/* -------------------------------- */}
        {/* Back */}
        {/* -------------------------------- */}

        <button
          type="button"
          className="back-link-button"
          onClick={() =>
            navigate("/hotels")
          }
        >
          ← Back to hotels
        </button>

        {/* -------------------------------- */}
        {/* Hotel Header */}
        {/* -------------------------------- */}

        <div className="hotel-title-section">

          <div className="hotel-title-content">

            <h1>
              {hotel.name}
            </h1>

            <p className="hotel-location">
              {hotel.location?.address}

              {hotel.location?.city &&
                `, ${hotel.location.city}`}

              {hotel.location?.state &&
                `, ${hotel.location.state}`}
            </p>

          </div>

          <div className="hotel-header-actions">

            {/* Rating */}

            <div className="hotel-rating">
              <span>
                ⭐ {hotel.rating}
              </span>

              <span>
                ({hotel.totalReviews}{" "}
                reviews)
              </span>
            </div>

            {/* Favorite */}

            <button
              type="button"
              className={`favorite-button ${
                isFavorite
                  ? "favorite-active"
                  : ""
              }`}
              onClick={
                handleFavoriteToggle
              }
              disabled={
                isFavoriteUpdating
              }
              aria-label={
                isFavorite
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              <span className="favorite-icon">
                {isFavorite
                  ? "♥"
                  : "♡"}
              </span>

              <span>
                {isFavoriteUpdating
                  ? "Updating..."
                  : isFavorite
                  ? "Saved"
                  : "Favorite"}
              </span>
            </button>

          </div>

        </div>

        {/* -------------------------------- */}
        {/* Images */}
        {/* -------------------------------- */}

        <HotelImageGallery
          images={
            hotel.images ?? []
          }
          hotelName={
            hotel.name
          }
        />

        {/* -------------------------------- */}
        {/* Hotel Information */}
        {/* -------------------------------- */}

        <div className="hotel-information">

          {/* Description */}

          <section className="hotel-description-section">

            <h2>
              About this hotel
            </h2>

            <p>
              {hotel.description}
            </p>

          </section>

          {/* Amenities */}

          <section className="hotel-amenities-section">

            <h2>
              Amenities
            </h2>

            {hotel.amenities?.length ? (
              <div className="amenities-grid">

                {hotel.amenities.map(
                  (amenity) => (
                    <div
                      key={amenity}
                      className="amenity-item"
                    >
                      ✓ {amenity}
                    </div>
                  )
                )}

              </div>
            ) : (
              <p>
                No amenities available.
              </p>
            )}

          </section>

        </div>

        {/* -------------------------------- */}
        {/* Rooms */}
        {/* -------------------------------- */}

        <section className="rooms-section">

          <div className="rooms-header">

            <div>
              <h2>
                Available Rooms
              </h2>

              <p>
                Choose a room to continue
                your booking.
              </p>
            </div>

            {!roomsLoading &&
              !roomsError && (
                <span>
                  {hotelRooms.length}{" "}
                  {hotelRooms.length ===
                  1
                    ? "room type"
                    : "room types"}
                </span>
              )}

          </div>

          {/* Loading */}

          {roomsLoading && (
            <div className="page-state">
              <p>
                Loading rooms...
              </p>
            </div>
          )}

          {/* Error */}

          {roomsError && (
            <div className="page-state error">

              <h3>
                Failed to load rooms
              </h3>

              <p>
                Please try again later.
              </p>

            </div>
          )}

          {/* Empty */}

          {!roomsLoading &&
            !roomsError &&
            hotelRooms.length ===
              0 && (
              <div className="empty-state">

                <h3>
                  No rooms available
                </h3>

                <p>
                  There are currently no
                  rooms available at this
                  hotel.
                </p>

              </div>
            )}

          {/* Room list */}

          {!roomsLoading &&
            !roomsError &&
            hotelRooms.length >
              0 && (
              <div className="rooms-list">

                {hotelRooms.map(
                  (room) => (
                    <RoomCard
                      key={room._id}
                      room={room}
                      onSelect={() =>
                        handleSelectRoom(
                          room
                        )
                      }
                    />
                  )
                )}

              </div>
            )}

        </section>

        {/* -------------------------------- */}
        {/* Reviews */}
        {/* -------------------------------- */}

        <section className="hotel-reviews-section">

  <div className="reviews-header">
    <div>
      <h2>
        Reviews
      </h2>

      <p>
        ⭐ {hotel.rating} from{" "}
        {hotel.totalReviews} reviews
      </p>
    </div>
  </div>

  {reviewsLoading && (
    <div className="reviews-placeholder">
      <p>
        Loading reviews...
      </p>
    </div>
  )}

  {reviewsError && (
    <div className="reviews-placeholder">
      <p>
        Failed to load reviews.
      </p>
    </div>
  )}

  {!reviewsLoading &&
    !reviewsError && (
      <ReviewList
        reviews={reviews}
      />
    )}

</section>

      </div>
    </main>
  );
};

export default HotelDetailsPage;