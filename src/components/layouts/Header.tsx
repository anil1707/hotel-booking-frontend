import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import "./Header.css"



const Header = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    user,
    isAuthenticated,
  } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}

        <Link
          to="/"
          className="logo"
        >
          StayFinder
        </Link>

        {/* Navigation */}

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

        {/* Authentication */}

        <div className="auth-links">

          {isAuthenticated ? (
            <>
              <span className="user-name">
                Hi, {user?.name}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link
                to="/register"
                className="register-button"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;