import type {
  HotelSearchParams,
} from "../../types/hotel";

interface HotelSortProps {
  value:
    | HotelSearchParams["sort"]
    | "";

  onChange: (
    value: HotelSearchParams["sort"]
  ) => void;
}

const HotelSort = ({
  value,
  onChange,
}: HotelSortProps) => {
  return (
    <div className="hotel-sort">
      <label htmlFor="sort">
        Sort by
      </label>

      <select
        id="sort"
        value={value}
        onChange={(event) =>
          onChange(
            event.target
              .value as HotelSearchParams["sort"]
          )
        }
      >
        <option value="">
          Recommended
        </option>

        <option value="rating_desc">
          Highest Rating
        </option>

        <option value="price_asc">
          Price: Low to High
        </option>

        <option value="price_desc">
          Price: High to Low
        </option>

        <option value="newest">
          Newest
        </option>
      </select>
    </div>
  );
};

export default HotelSort;