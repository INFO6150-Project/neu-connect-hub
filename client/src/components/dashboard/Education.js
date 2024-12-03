import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";
import formatDate from "../../utils/formatDate";
import "./Education.css";

const Education = ({ education, deleteEducation }) => {
  if (!education.length) {
    return (
      <div className="education-empty">
        <p>No education credentials added yet</p>
      </div>
    );
  }

  return (
    <div className="education-list">
      {education.map((edu) => (
        <div key={edu._id} className="education-item">
          <div className="education-main">
            <div className="education-school">{edu.school}</div>
            <div className="education-degree">{edu.degree}</div>
            <div className="education-date">
              {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Present"}
            </div>
          </div>
          <button
            onClick={() => deleteEducation(edu._id)}
            className="education-delete"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
