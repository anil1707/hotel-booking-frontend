import { NavLink } from "react-router-dom";

interface OwnerSidebarProps {
  onLogout: () => void;
}

const OwnerSidebar = ({
  onLogout,
}: OwnerSidebarProps) => {
  return (
    <aside className="owner-sidebar">

      <div className="owner-sidebar-brand">

        <h2>StayFinder</h2>

        <span>
          Owner Portal
        </span>

      </div>

      <nav className="owner-navigation">

        <NavLink to="/owner">
          Dashboard
        </NavLink>

        <NavLink to="/owner/hotels">
          My Hotels
        </NavLink>

        <NavLink to="/owner/rooms">
          Rooms
        </NavLink>

        <NavLink to="/owner/bookings">
          Bookings
        </NavLink>

      </nav>

      <button
        type="button"
        className="owner-logout"
        onClick={onLogout}
      >
        Logout
      </button>

    </aside>
  );
};

export default OwnerSidebar;