import HotelCardSkeleton from "./HotelCardSkeleton";

const HotelListSkeleton = () => {
  return (
    <div className="hotel-list">
      {Array.from({
        length: 6,
      }).map((_, index) => (
        <HotelCardSkeleton
          key={index}
        />
      ))}
    </div>
  );
};

export default HotelListSkeleton;