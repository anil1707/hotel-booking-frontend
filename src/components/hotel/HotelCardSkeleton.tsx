const HotelCardSkeleton = () => {
  return (
    <div className="hotel-card skeleton-card">
      <div className="skeleton-image" />

      <div className="skeleton-content">
        <div className="skeleton-line title" />

        <div className="skeleton-line" />

        <div className="skeleton-line" />

        <div className="skeleton-line short" />

        <div className="skeleton-button" />
      </div>
    </div>
  );
};

export default HotelCardSkeleton;