import { Link } from "react-router-dom";

import "./../../../styles/owner/owner-dashboard.css";

const OwnerDashboardPage = () => {
  return (
    <section className="owner-dashboard">

      <div className="owner-dashboard-header">

        <div>
          <h2>
            Dashboard
          </h2>

          <p>
            Manage your hotels,
            rooms and bookings.
          </p>
        </div>

        <Link
          to="/owner/hotels/new"
          className="owner-primary-button"
        >
          + Add Hotel
        </Link>

      </div>

      <div className="owner-stats">

        <div className="owner-stat-card">
          <span>
            Total Hotels
          </span>

          <strong>
            0
          </strong>
        </div>

        <div className="owner-stat-card">
          <span>
            Total Rooms
          </span>

          <strong>
            0
          </strong>
        </div>

        <div className="owner-stat-card">
          <span>
            Total Bookings
          </span>

          <strong>
            0
          </strong>
        </div>

        <div className="owner-stat-card">
          <span>
            Pending Bookings
          </span>

          <strong>
            0
          </strong>
        </div>

      </div>

      <div className="owner-dashboard-section">

        <div className="owner-section-header">

          <h3>
            Quick Actions
          </h3>

        </div>

        <div className="owner-quick-actions">

          <Link to="/owner/hotels/new">
            Add Hotel
          </Link>

          <Link to="/owner/hotels">
            Manage Hotels
          </Link>

          <Link to="/owner/rooms">
            Manage Rooms
          </Link>

          <Link to="/owner/bookings">
            View Bookings
          </Link>

        </div>

      </div>

    </section>
  );
};

export default OwnerDashboardPage;