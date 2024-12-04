import React from "react";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatDate";
import "./ProfileExperience.css";

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => (
  <div className="experience-item">
    <h3 className="experience-company">{company}</h3>
    <p className="experience-date">
      {formatDate(from)} - {to ? formatDate(to) : "Present"}
    </p>
    <p className="experience-detail">
      <span className="detail-label">Position:</span> {title}
    </p>
    <p className="experience-detail">
      <span className="detail-label">Location:</span> {location}
    </p>
    {description && (
      <p className="experience-detail">
        <span className="detail-label">Description:</span> {description}
      </p>
    )}
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
