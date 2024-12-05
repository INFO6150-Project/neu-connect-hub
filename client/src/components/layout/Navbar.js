import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "./Navbar.css";

const Navbar = ({ auth = {}, admin = {}, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isMenuOpen]);

  // Close menu on outside click
  useEffect(() => {
    const closeMenu = (e) => {
      if (isMenuOpen && !e.target.closest(".navbar")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [isMenuOpen]);

  // Close menu on resize
  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const authLinks = (
    <ul className="navbar-nav">
      <li>
        <Link to="/profiles" onClick={handleLinkClick}>
          Developers
        </Link>
      </li>
      <li>
        <Link to="/posts" onClick={handleLinkClick}>
          Posts
        </Link>
      </li>
      <li>
        <Link to="/dashboard" onClick={handleLinkClick}>
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="http://localhost:3000/login" onClick={handleLinkClick}>
          ConnectRoom
        </Link>
      </li>
      <li>
        <a
          href="#!"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick();
            logout();
          }}
        >
          Logout
        </a>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul className="navbar-nav">
      <li>
        <Link to="/admin/dashboard" onClick={handleLinkClick}>
          Admin Dashboard
        </Link>
      </li>
      <li>
        <a
          href="#!"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick();
            logout();
          }}
        >
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav">
      <li>
        <Link to="/profiles" onClick={handleLinkClick}>
          Developers
        </Link>
      </li>
      <li>
        <Link to="/register" onClick={handleLinkClick}>
          Register
        </Link>
      </li>
      <li>
        <Link to="/login" onClick={handleLinkClick}>
          User Login
        </Link>
      </li>
      <li>
        <Link to="/admin/login" onClick={handleLinkClick}>
          Admin Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className={`navbar ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="navbar-brand">
        <Link to="/" onClick={handleLinkClick}>
          NEU Connect
        </Link>
      </div>

      <div className="navbar-menu">
        {admin.isAuthenticated
          ? adminLinks
          : auth.isAuthenticated
          ? authLinks
          : guestLinks}
      </div>

      <button
        className="hamburger"
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        <div className="hamburger-lines">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </button>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth || {}, // Fallback to an empty object
  admin: state.admin || {}, // Fallback to an empty object
});

export default connect(mapStateToProps, { logout })(Navbar);
