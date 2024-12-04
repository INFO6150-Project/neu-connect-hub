import React from "react";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatDate";
import "./ProfileEducation.css";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => (
  <div className="education-item">
    <h3 className="education-school">{school}</h3>
    <p className="education-date">
      {formatDate(from)} - {to ? formatDate(to) : "Present"}
    </p>
    <p className="education-detail">
      <span className="detail-label">Degree:</span> {degree}
    </p>
    <p className="education-detail">
      <span className="detail-label">Field of Study:</span> {fieldofstudy}
    </p>
    {description && (
      <p className="education-detail">
        <span className="detail-label">Description:</span> {description}
      </p>
    )}
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
