import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import build from "../../img/build.jpg";
import connect from "../../img/connect.jpg";
import share from "../../img/share.jpg";

const Layout = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <div className="hero-section">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
              Create a developer profile, share posts and get help from other
              developers
            </p>
            <div className="buttons">
              <Link className="btn btn-primary" to="/register">
                Sign Up
              </Link>
              <Link className="btn btn-light" to="/login">
                Login
              </Link>
            </div>
          </div>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-content">
                <h3>Build Your Profile</h3>
                <p>
                  Create a stunning portfolio to showcase your skills and
                  experience to the world.
                </p>
              </div>
              <div className="feature-visual">
                <img src={build} alt="build image" />
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-content">
                <h3>Connect & Grow</h3>
                <p>
                  Network with developers worldwide and find opportunities for
                  collaboration.
                </p>
              </div>
              <div className="feature-visual">
                <img src={connect} alt="connect image" />
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-content">
                <h3>Share & Learn</h3>
                <p>
                  Exchange knowledge, get feedback, and accelerate your
                  professional growth.
                </p>
              </div>
              <div className="feature-visual">
                <img src={share} alt="share image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
