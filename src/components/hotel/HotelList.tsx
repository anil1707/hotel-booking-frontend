import type { Hotel } from "../../types/hotel";
import HotelCard from "./HotelCard";


interface HotelListProps {
  hotels: Hotel[];
  searchParams?: string;
}

const HotelList = ({
  hotels,
  searchParams
}: HotelListProps) => {
  

  if (hotels.length === 0) {
    return (
      <div className="empty-state">
        <h3>
          No hotels found
        </h3>

        <p>
          Try changing your search
          criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="hotel-list">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel._id}
          hotel={hotel}
          searchParams={
            searchParams
          }
        />
      ))}
    </div>
  );
};

export default HotelList;