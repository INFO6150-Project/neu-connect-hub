import React from "react";
import PropTypes from "prop-types";
import "./ProfileTop.css";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className="profile-header-section">
      <div className="profile-header-content">
        <div className="profile-avatar">
          <img src={avatar} alt={`${name}'s avatar`} />
        </div>

        <div className="profile-info">
          <h1 className="profile-name">{name}</h1>
          <p className="profile-status">
            {status} {company && <span>at {company}</span>}
          </p>
          {location && <p className="profile-location">{location}</p>}
        </div>

        {(website || social) && (
          <div className="profile-links">
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link website-link"
              >
                Website
              </a>
            )}

            {social &&
              Object.entries(social)
                .filter(([_, value]) => value)
                .map(([key, value]) => (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`profile-link social-link ${key}-link`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </a>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
