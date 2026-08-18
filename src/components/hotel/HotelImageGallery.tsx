interface HotelImageGalleryProps {
  images: string[];
  hotelName: string;
}

const HotelImageGallery = ({
  images,
  hotelName,
}: HotelImageGalleryProps) => {
  const displayImages =
    images.slice(0, 5);

  if (!displayImages.length) {
    return (
      <div className="hotel-gallery-empty">
        No images available
      </div>
    );
  }

  return (
    <div className="hotel-gallery">
      {displayImages.map(
        (image, index) => (
          <img
            key={`${image}-${index}`}
            src={image}
            alt={`${hotelName} ${index + 1}`}
            className={
              index === 0
                ? "hotel-gallery-main"
                : "hotel-gallery-image"
            }
          />
        )
      )}
    </div>
  );
};

export default HotelImageGallery;