import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link
            to="/hotels"
            className="footer-logo"
          >
            StayFinder
          </Link>

          <p>
            Find your perfect stay and
            book your next trip with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/hotels">
            Hotels
          </Link>

          <Link to="/bookings">
            My Bookings
          </Link>

          <Link to="/favorites">
            Favorites
          </Link>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Support</h3>

          <Link to="/contact">
            Contact Us
          </Link>

          <Link to="/help">
            Help Center
          </Link>

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p>
            Email: support@stayfinder.com
          </p>

          <p>
            Phone: +91 98765 43210
          </p>

          <p>
            Available 24/7
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>
            © {new Date().getFullYear()}{" "}
            StayFinder. All rights reserved.
          </p>

          <div className="footer-social">
            <a
              href="#"
              aria-label="Facebook"
            >
              Facebook
            </a>

            <a
              href="#"
              aria-label="Instagram"
            >
              Instagram
            </a>

            <a
              href="#"
              aria-label="Twitter"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;