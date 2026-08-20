import { useNavigate } from "react-router-dom";
import { useState } from "react";



import "./FavoritesPage.css";
import { useFavorites, useRemoveFavorite } from "../../features/favorite/useFavorite";
import ConfirmationModal from "../../components/common/ confirmationModal/ConfirmationModal";

const FavoritesPage = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
  } = useFavorites();

  const {
    mutateAsync: removeFavorite,
    isPending: isRemoving,
  } = useRemoveFavorite();

  const [favoriteToRemove, setFavoriteToRemove] =
    useState<string | null>(null);

  const favorites = data?.data ?? [];

  const handleViewHotel = (
    hotelId: string
  ) => {
    navigate(`/hotels/${hotelId}`);
  };

  const handleRemoveClick = (
    hotelId: string
  ) => {
    setFavoriteToRemove(hotelId);
  };

  const handleRemoveFavorite = async () => {
    if (!favoriteToRemove) {
      return;
    }

    try {
      await removeFavorite(
        favoriteToRemove
      );

      setFavoriteToRemove(null);
    } catch (error) {
      console.error(
        "Failed to remove favorite:",
        error
      );
    }
  };

  if (isLoading) {
    return (
      <main className="favorites-page">
        <div className="favorites-container">
          <h1>My Favorites</h1>

          <div className="favorites-loading">
            Loading your favorite hotels...
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="favorites-page">
        <div className="favorites-container">
          <h1>My Favorites</h1>

          <div className="favorites-error">
            <p>
              Failed to load your
              favorite hotels.
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
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
    <main className="favorites-page">
      <div className="favorites-container">

        <div className="favorites-header">
          <div>
            <h1>My Favorites</h1>

            <p>
              Hotels you've saved for
              your next stay.
            </p>
          </div>

          <span className="favorites-count">
            {favorites.length}{" "}
            {favorites.length === 1
              ? "hotel"
              : "hotels"}
          </span>
        </div>

        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <div className="empty-icon">
              ♡
            </div>

            <h2>
              No favorite hotels yet
            </h2>

            <p>
              Save hotels you love and
              find them here later.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/hotels")
              }
            >
              Explore Hotels
            </button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map(
              (favorite) => {
                const hotel =
                  favorite.hotelId;

                return (
                  <article
                    key={favorite._id}
                    className="favorite-card"
                  >
                    <div className="favorite-image-wrapper">
                      {hotel.images?.[0] ? (
                        <img
                          src={
                            hotel.images[0]
                          }
                          alt={
                            hotel.name
                          }
                          className="favorite-image"
                        />
                      ) : (
                        <div className="favorite-image-placeholder">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="favorite-content">

                      <h2>
                        {hotel.name}
                      </h2>

                      <p className="favorite-location">
  {hotel.location?.address}
˜
  {hotel.location?.city &&
    `, ${hotel.location.city}`}

  {hotel.location?.state &&
    `, ${hotel.location.state}`}
</p>

                      <div className="favorite-rating">
                        <span>
                          ★
                        </span>

                        <strong>
                          {hotel.rating ??
                            "N/A"}
                        </strong>

                        <span>
                          (
                          {
                            hotel.reviewCount
                          }{" "}
                          reviews)
                        </span>
                      </div>

                      <div className="favorite-actions">

                        <button
                          type="button"
                          className="view-hotel-button"
                          onClick={() =>
                            handleViewHotel(
                              hotel._id
                            )
                          }
                        >
                          View Hotel
                        </button>

                        <button
                          type="button"
                          className="remove-favorite-button"
                          onClick={() =>
                            handleRemoveClick(
                              hotel._id
                            )
                          }
                          disabled={
                            isRemoving
                          }
                        >
                          Remove
                        </button>

                      </div>

                    </div>
                  </article>
                );
              }
            )}
          </div>
        )}

      </div>

      <ConfirmationModal
        isOpen={Boolean(
          favoriteToRemove
        )}
        title="Remove Favorite?"
        message="Are you sure you want to remove this hotel from your favorites?"
        confirmText="Yes, Remove"
        cancelText="Keep Favorite"
        isLoading={isRemoving}
        onConfirm={
          handleRemoveFavorite
        }
        onCancel={() =>
          setFavoriteToRemove(null)
        }
      />

    </main>
  );
};

export default FavoritesPage;