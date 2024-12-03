import React from "react";
import { Link } from "react-router-dom";
import "./DashboardActions.css";

const DashboardActions = () => {
  return (
    <div className="dashboard-actions">
      <Link to="/edit-profile" className="action-button">
        Edit Profile
      </Link>
      <Link to="/add-experience" className="action-button">
        Add Experience
      </Link>
      <Link to="/add-education" className="action-button">
        Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
