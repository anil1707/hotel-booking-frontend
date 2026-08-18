import {
  useSearchParams,
} from "react-router-dom";

import HotelList from "../../components/hotel/HotelList";
import HotelFilters from "../../components/hotel/HotelFilters";
import Pagination from "../../components/common/Pagination";


import type {
  HotelSearchParams,
} from "../../types/hotel";
import { useHotels } from "../../features/hotels/useHotel";
import HotelSort from "../../components/hotel/HotesSort";
import HotelListSkeleton from "../../components/hotel/HotelListSkeleton";

const HotelsPage = () => {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const currentSearch =
    searchParams.toString();

  const location =
    searchParams.get("location") ||
    undefined;

  const checkIn =
    searchParams.get("checkIn") ||
    undefined;

  const checkOut =
    searchParams.get("checkOut") ||
    undefined;

  const guestsParam =
    searchParams.get("guests");

  const roomsParam =
    searchParams.get("rooms");

  const minPrice =
    searchParams.get("minPrice") || "";

  const maxPrice =
    searchParams.get("maxPrice") || "";

  const rating =
    searchParams.get("rating") || "";

  const sort =
    searchParams.get("sort") ||
    undefined;

  const pageParam =
    searchParams.get("page");

  const page = pageParam
    ? Number(pageParam)
    : 1;

  const guests = guestsParam
    ? Number(guestsParam)
    : undefined;

  const rooms = roomsParam
    ? Number(roomsParam)
    : undefined;

  const params: HotelSearchParams = {
    location,
    checkIn,
    checkOut,
    guests,
    rooms,

    minPrice: minPrice
      ? Number(minPrice)
      : undefined,

    maxPrice: maxPrice
      ? Number(maxPrice)
      : undefined,

    rating: rating
      ? Number(rating)
      : undefined,

    amenities:
      searchParams.get("amenities") ||
      undefined,

    sort:
      sort as HotelSearchParams["sort"],

    page,
    limit: 10,
  };

  const {
    data,
    isLoading,
    isError,
    error,
  } = useHotels(params);

  const updateParam = (
    key: string,
    value: string
  ) => {
    const newParams =
      new URLSearchParams(
        searchParams
      );

    if (value) {
      newParams.set(
        key,
        value
      );
    } else {
      newParams.delete(key);
    }

    if (key !== "page") {
      newParams.set(
        "page",
        "1"
      );
    }

    setSearchParams(
      newParams
    );
  };

  const handlePageChange = (
    newPage: number
  ) => {
    updateParam(
      "page",
      String(newPage)
    );
  };

  const handleClearFilters = () => {
    const newParams =
      new URLSearchParams();

    if (location) {
      newParams.set(
        "location",
        location
      );
    }

    if (checkIn) {
      newParams.set(
        "checkIn",
        checkIn
      );
    }

    if (checkOut) {
      newParams.set(
        "checkOut",
        checkOut
      );
    }

    if (guests) {
      newParams.set(
        "guests",
        String(guests)
      );
    }

    if (rooms) {
      newParams.set(
        "rooms",
        String(rooms)
      );
    }

    setSearchParams(
      newParams
    );
  };

  const handleApplyFilters = (
    filters: {
      minPrice: string;
      maxPrice: string;
      rating: string;
      amenities: string[];
    }
  ) => {
    const newParams =
      new URLSearchParams(
        searchParams
      );

    if (filters.minPrice) {
      newParams.set(
        "minPrice",
        filters.minPrice
      );
    } else {
      newParams.delete("minPrice");
    }

    if (filters.maxPrice) {
      newParams.set(
        "maxPrice",
        filters.maxPrice
      );
    } else {
      newParams.delete("maxPrice");
    }

    if (filters.rating) {
      newParams.set(
        "rating",
        filters.rating
      );
    } else {
      newParams.delete("rating");
    }

    if (filters.amenities.length) {
      newParams.set(
        "amenities",
        filters.amenities.join(",")
      );
    } else {
      newParams.delete(
        "amenities"
      );
    }

    // Reset pagination after
    // changing filters.
    newParams.set("page", "1");

    setSearchParams(
      newParams
    );
  };

  const amenities =
    searchParams.get(
      "amenities"
    )
      ? searchParams
        .get("amenities")!
        .split(",")
      : [];

  const handleAmenityChange = (
    amenity: string
  ) => {
    const updated =
      amenities.includes(amenity)
        ? amenities.filter(
          (item) =>
            item !== amenity
        )
        : [
          ...amenities,
          amenity,
        ];

    updateParam(
      "amenities",
      updated.join(",")
    );
  };

  if (isLoading) {
    return (
      <HotelListSkeleton />
    );
  }

  if (isError) {
    return (
      <div className="page-state error">
        <h3>
          Failed to load hotels
        </h3>

        <p>
          {error instanceof Error
            ? error.message
            : "Something went wrong"}
        </p>
      </div>
    );
  }

  const hotels =
    data?.data ?? [];

  const pagination =
    data?.data.pagination;

  return (
    <section className="hotels-page">
      <div className="hotels-container">
        <div className="hotels-header">
          <div>
            <h1>
              {location
                ? `Hotels in ${location}`
                : "Hotels"}
            </h1>

            <p>
              {pagination?.total ?? 0}{" "}
              hotels found
            </p>
          </div>

          <HotelSort
            value={
              sort as HotelSearchParams["sort"]
            }
            onChange={(value) =>
              updateParam(
                "sort",
                value || ""
              )
            }
          />
        </div>

        <div className="hotels-content">
          <HotelFilters
            minPrice={minPrice}
            maxPrice={maxPrice}
            rating={rating}
            amenities={amenities}
            onApply={handleApplyFilters}
            onClear={
              handleClearFilters
            }
          />

          <div className="hotels-results">
            <HotelList
              hotels={hotels}
              searchParams={
                currentSearch
              }
            />

            {pagination && (
              <Pagination
                page={
                  pagination.page
                }
                totalPages={
                  pagination.totalPages
                }
                hasNextPage={
                  pagination.hasNextPage
                }
                hasPreviousPage={
                  pagination.hasPreviousPage
                }
                onPageChange={
                  handlePageChange
                }
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelsPage;