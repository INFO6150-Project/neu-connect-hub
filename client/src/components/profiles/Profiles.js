import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";
import "./Profiles.css";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  if (loading) return <Spinner />;

  return (
    <div className="profiles-container">
      <div className="profiles-header">
        <h1 className="profiles-title">Developers</h1>
        <p className="profiles-subtitle">
          Connect with developers from around the world
        </p>
      </div>

      <div className="profiles-grid">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <div className="profiles-empty">
            <p>No developer profiles found</p>
          </div>
        )}
      </div>
    </div>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
