import { useEffect, useState } from "react";

interface HotelFiltersProps {
  minPrice: string;
  maxPrice: string;
  rating: string;
  amenities: string[];

  onApply: (filters: {
    minPrice: string;
    maxPrice: string;
    rating: string;
    amenities: string[];
  }) => void;

  onClear: () => void;
}

const HotelFilters = ({
  minPrice,
  maxPrice,
  rating,
  amenities,
  onApply,
  onClear,
}: HotelFiltersProps) => {
  const [localMinPrice, setLocalMinPrice] =
    useState(minPrice);

  const [localMaxPrice, setLocalMaxPrice] =
    useState(maxPrice);

  const [localRating, setLocalRating] =
    useState(rating);

  const [localAmenities, setLocalAmenities] =
    useState<string[]>(amenities);


    useEffect(() => {
  setLocalMinPrice(
    minPrice
  );

  setLocalMaxPrice(
    maxPrice
  );

  setLocalRating(
    rating
  );

  setLocalAmenities(
    amenities
  );
}, [
  minPrice,
  maxPrice,
  rating,
  amenities,
]);

  const handleAmenityChange = (
    amenity: string
  ) => {
    setLocalAmenities((current) =>
      current.includes(amenity)
        ? current.filter(
            (item) => item !== amenity
          )
        : [...current, amenity]
    );
  };

  const handleApply = () => {
    onApply({
      minPrice: localMinPrice,
      maxPrice: localMaxPrice,
      rating: localRating,
      amenities: localAmenities,
    });
  };

  return (
    <aside className="hotel-filters">
      <div className="filter-header">
        <h3>Filters</h3>

        <button
          type="button"
          onClick={onClear}
        >
          Clear
        </button>
      </div>

      <div className="filter-section">
        <h4>Price per night</h4>

        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={localMinPrice}
            onChange={(event) =>
              setLocalMinPrice(
                event.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Max"
            value={localMaxPrice}
            onChange={(event) =>
              setLocalMaxPrice(
                event.target.value
              )
            }
          />
        </div>
      </div>

      <div className="filter-section">
        <h4>Rating</h4>

        {["4", "3", "2"].map(
          (value) => (
            <label
              key={value}
              className="radio-option"
            >
              <input
                type="radio"
                name="rating"
                value={value}
                checked={
                  localRating === value
                }
                onChange={(event) =>
                  setLocalRating(
                    event.target.value
                  )
                }
              />

              {value}+ stars
            </label>
          )
        )}
      </div>

      <div className="filter-section">
        <h4>Amenities</h4>

        {[
          "WiFi",
          "Pool",
          "Parking",
          "Restaurant",
          "Gym",
        ].map((amenity) => (
          <label
            key={amenity}
            className="checkbox-option"
          >
            <input
              type="checkbox"
              checked={localAmenities.includes(
                amenity
              )}
              onChange={() =>
                handleAmenityChange(
                  amenity
                )
              }
            />

            {amenity}
          </label>
        ))}
      </div>

      <button
        type="button"
        className="apply-filter-button"
        onClick={handleApply}
      >
        Apply Filters
      </button>
    </aside>
  );
};

export default HotelFilters;