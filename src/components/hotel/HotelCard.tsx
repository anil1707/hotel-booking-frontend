import { Link } from "react-router-dom";

import type { Hotel } from "../../types/hotel";

interface HotelCardProps {
  hotel: Hotel;
  searchParams?: string;
}

const HotelCard = ({
  hotel,
  searchParams
}: HotelCardProps) => {
  return (
    <article className="hotel-card">
      <img
        src={
          hotel.images?.[0] ||
          "/hotel-placeholder.jpg"
        }
        alt={hotel.name}
        className="hotel-card-image"
      />

      <div className="hotel-card-content">
        <div className="hotel-card-header">
          <h3>{hotel.name}</h3>

          <span>
            ⭐ {hotel.rating}
          </span>
        </div>

        <p className="hotel-location">
          {hotel.location.city}
          {hotel.location.state
            ? `, ${hotel.location.state}`
            : ""}
        </p>

        <p className="hotel-description">
          {hotel.description}
        </p>

        <div className="hotel-amenities">
          {hotel.amenities
            ?.slice(0, 3)
            .map((amenity) => (
              <span key={amenity}>
                {amenity}
              </span>
            ))}
        </div>

        <Link
  to={{
    pathname: `/hotels/${hotel._id}`,
    search:
      searchParams || "",
  }}
  className="view-hotel-button"
>
  View Hotel
</Link>
      </div>
    </article>
  );
};

export default HotelCard;