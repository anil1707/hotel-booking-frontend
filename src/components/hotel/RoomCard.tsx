import type { Room } from "../../api/hotel.api";
import './RoomCard.css'

interface RoomCardProps {
  room: Room;
  onSelect: (
    room: Room
  ) => void;
}

const RoomCard = ({
  room,
  onSelect,
}: RoomCardProps) => {
  return (
    <article className="room-card">

      {room.images?.[0] && (
        <img
          src={room.images[0]}
          alt={room.name}
          className="room-image"
        />
      )}

      <div className="room-content">

        <h3>
          {room.name}
        </h3>

        <p className="room-description">
          {room.description}
        </p>

        <div className="room-info">
          <span>
            👤 Up to{" "}
            {room.capacity} guests
          </span>

          <span>
            🛏 {room.beds} beds
          </span>
        </div>

        <div className="room-amenities">
          {room.amenities
            ?.slice(0, 4)
            .map((amenity) => (
              <span
                key={amenity}
              >
                {amenity}
              </span>
            ))}
        </div>

        <div className="room-footer">

          <div>
            <strong>
              ₹{room.pricePerNight}
            </strong>

            <span>
              {" "} / night
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              onSelect(room)
            }
          >
            Select Room
          </button>

        </div>

      </div>
    </article>
  );
};

export default RoomCard;