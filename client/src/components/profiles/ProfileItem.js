import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ProfileItem.css";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className="profile-card">
      <div className="profile-card-header">
        {/* <img src={avatar} alt={name} className="profile-avatar" /> */}
        <div className="profile-info">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-status">
            {status} {company && <span>at {company}</span>}
          </p>
          {location && <p className="profile-location">{location}</p>}
        </div>
      </div>

      <div className="profile-skills">
        {skills.slice(0, 4).map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>

      <Link to={`/profile/${_id}`} className="view-profile-button">
        View Profile
      </Link>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
