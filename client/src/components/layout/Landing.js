import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import build from "../../img/build.jpg";
import connect from "../../img/connect.jpg";
import share from "../../img/share.jpg";
import title from "../../img/title.jpg";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-inner">
        {/* Hero Section */}
        <div className="hero-container">
          <div className="hero-content">
            <h1>
              Where developers <br /> grow together
            </h1>
            <p className="hero-description">
              NEU Connect is the professional community where developers
              collaborate, share knowledge, and build their careers.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn-primary">
                Sign up for free
              </Link>
              <Link to="/login" className="btn-secondary">
                Sign in →
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <img src={title} alt="Collaboration" className="hero-image" />
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="feature-block">
            <div className="feature-content">
              <h2>Build your professional identity</h2>
              <p>
                Create a detailed developer profile that showcases your skills,
                projects, and experience to potential collaborators and
                employers.
              </p>
              <ul className="feature-list">
                <li>Customizable portfolio</li>
                <li>GitHub repository integration</li>
                <li>Skills and endorsements</li>
              </ul>
            </div>
            <div className="feature-visual">
              <img src={build} alt="Build Profile" />
            </div>
          </div>

          <div className="feature-block reverse">
            <div className="feature-content">
              <h2>Connect with developers</h2>
              <p>
                Join a thriving community of developers, where you can network,
                collaborate on projects, and grow your professional circle.
              </p>
              <ul className="feature-list">
                <li>Global developer network</li>
                <li>Real-time messaging</li>
                <li>Project collaboration</li>
              </ul>
            </div>
            <div className="feature-visual">
              <img src={connect} alt="Connect" />
            </div>
          </div>

          <div className="feature-block">
            <div className="feature-content">
              <h2>Share knowledge & grow</h2>
              <p>
                Exchange ideas, ask questions, and share your expertise with
                developers from around the world.
              </p>
              <ul className="feature-list">
                <li>Technical discussions</li>
                <li>Code reviews</li>
                <li>Mentorship opportunities</li>
              </ul>
            </div>
            <div className="feature-visual">
              <img src={share} alt="Share" />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>Ready to join our community?</h2>
          <p>Start building your developer network today.</p>
          <Link to="/register" className="btn-primary">
            Get started for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
