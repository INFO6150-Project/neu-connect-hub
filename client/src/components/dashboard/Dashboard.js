import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from '../layout/Spinner';
import "./Dashboard.css";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      getCurrentProfile();
      setInitialLoad(false);
    }
  }, [getCurrentProfile, initialLoad]);

  if (loading && initialLoad) {
    return <Spinner />;
  }

  return (
    <div className="dashboard-container">
      <header className="userdashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-welcome">
          {user && `Welcome back, ${user.name}`}
        </p>
      </header>

      {profile !== null ? (
        <>
          <div className="dashboard-grid">
            <div className="dashboard-section">
              <h2 className="dashboard-section-title">Profile Actions</h2>
              <DashboardActions />
            </div>

            <div className="dashboard-section">
              <h2 className="dashboard-section-title">Experience</h2>
              <Experience experience={profile.experience} />
            </div>

            <div className="dashboard-section">
              <h2 className="dashboard-section-title">Education</h2>
              <Education education={profile.education} />
            </div>
          </div>

          <div className="button-container">
            <button
              className="apple-button apple-button-danger"
              onClick={() => deleteAccount()}
            >
              Delete Account
            </button>
          </div>
        </>
      ) : (
        <div className="dashboard-section dashboard-empty">
          <p>You haven't created a profile yet. Create one to get started.</p>
          <Link
            to="/create-profile"
            className="apple-button apple-button-primary"
          >
            Create Profile
          </Link>
        </div>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);