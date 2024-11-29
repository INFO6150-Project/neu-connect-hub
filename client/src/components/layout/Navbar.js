import "./navbar.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({
  title = "NEU Connect",
  auth: { isAuthenticated, loading },
  logout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  const authLinks = (
    <>
      <li>
        <Link to="/profiles" onClick={closeMenu}>
          Developers
        </Link>
      </li>
      <li>
        <Link
          to="/"
          onClick={() => {
            logout();
            closeMenu();
          }}
        >
          Logout
        </Link>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/profiles" onClick={closeMenu}>
          Developers
        </Link>
      </li>
      <li>
        <Link to="/register" onClick={closeMenu}>
          Register
        </Link>
      </li>
      <li>
        <Link to="/login" onClick={closeMenu}>
          Login
        </Link>
      </li>
    </>
  );

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <h1>
            <Link to="/">{title}</Link>
          </h1>

          {/* Desktop Menu */}
          <ul className="nav-menu desktop-menu">
            {!loading && (isAuthenticated ? authLinks : guestLinks)}
          </ul>

          {/* Hamburger Button */}
          <div
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
            <div className="mobile-menu-container">
              <ul className="nav-menu">
                {!loading && (isAuthenticated ? authLinks : guestLinks)}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Overlay */}
      <div
        className={`mobile-menu-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      />
    </>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
