import React from "react";
import PropTypes from "prop-types";
import "./ProfileAbout.css";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => (
  <div className="profile-about-section">
    {bio && (
      <div className="about-bio">
        <h2 className="about-title">{name.trim().split(" ")[0]}'s Bio</h2>
        <p className="bio-text">{bio}</p>
      </div>
    )}

    <div className="about-skills">
      <h2 className="about-title">Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-tag">
            {skill}
          </div>
        ))}
      </div>
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
