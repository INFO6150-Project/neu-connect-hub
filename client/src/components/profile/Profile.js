import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from "../../actions/profile";
import "./Profile.css";

const Profile = ({ getProfileById, profile: { profile }, auth }) => {
  const { id } = useParams();

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  if (!profile) return <Spinner />;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-nav">
          <Link to="/profiles" className="back-button">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="edit-button">
                Edit Profile
              </Link>
            )}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section main-info">
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h2>Experience</h2>
          </div>
          <div className="section-content">
            {profile.experience.length > 0 ? (
              profile.experience.map((experience) => (
                <ProfileExperience
                  key={experience._id}
                  experience={experience}
                />
              ))
            ) : (
              <p className="empty-state">No experience added yet</p>
            )}
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h2>Education</h2>
          </div>
          <div className="section-content">
            {profile.education.length > 0 ? (
              profile.education.map((education) => (
                <ProfileEducation key={education._id} education={education} />
              ))
            ) : (
              <p className="empty-state">No education added yet</p>
            )}
          </div>
        </div>

        {profile.githubusername && (
          <div className="profile-section">
            <div className="section-header">
              <h2>GitHub Repositories</h2>
            </div>
            <div className="section-content">
              <ProfileGithub username={profile.githubusername} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
