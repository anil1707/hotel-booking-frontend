import {
  Link,
} from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link
          to="/"
          className="logo"
        >
          StayFinder
        </Link>

        <nav className="navigation">
          <Link to="/hotels">
            Hotels
          </Link>

          <Link to="/bookings">
            My Bookings
          </Link>

          <Link to="/favorites">
            Favorites
          </Link>
        </nav>

        <div className="auth-links">
          <Link to="/login">
            Login
          </Link>

          <Link
            to="/register"
            className="register-button"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;