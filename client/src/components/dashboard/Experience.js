import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";
import formatDate from "../../utils/formatDate";
import "./Experience.css";

const Experience = ({ experience, deleteExperience }) => {
  if (!experience.length) {
    return (
      <div className="experience-empty">
        <p>No work experience added yet</p>
      </div>
    );
  }

  return (
    <div className="experience-list">
      {experience.map((exp) => (
        <div key={exp._id} className="experience-item">
          <div className="experience-main">
            <div className="experience-company">{exp.company}</div>
            <div className="experience-title">{exp.title}</div>
            <div className="experience-date">
              {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Present"}
            </div>
          </div>
          <button
            onClick={() => deleteExperience(exp._id)}
            className="experience-delete"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
