import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import "./AddEducation.css";

const AddEducation = ({ addEducation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { school, degree, fieldofstudy, from, to, description, current } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData).then(() => navigate("/dashboard"));
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1 className="form-title">Add Education</h1>
        <p className="form-subtitle">
          Add any school or bootcamp that you have attended
        </p>
      </div>

      <div className="form-section">
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <div className="input-label">School or Bootcamp *</div>
            <input
              type="text"
              name="school"
              value={school}
              onChange={onChange}
              className="form-input"
              placeholder="Harvard University"
              required
            />
            <small className="input-hint">
              Enter the name of your school or bootcamp
            </small>
          </div>

          <div className="input-group">
            <div className="input-label">Degree or Certificate *</div>
            <input
              type="text"
              name="degree"
              value={degree}
              onChange={onChange}
              className="form-input"
              placeholder="Bachelor of Science"
              required
            />
            <small className="input-hint">
              Enter your degree or certificate name
            </small>
          </div>

          <div className="input-group">
            <div className="input-label">Field of Study</div>
            <input
              type="text"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={onChange}
              className="form-input"
              placeholder="Computer Science"
            />
            <small className="input-hint">
              Enter your major or area of study
            </small>
          </div>

          <div className="date-group">
            <div className="input-group">
              <div className="input-label">From Date *</div>
              <input
                type="date"
                name="from"
                value={from}
                onChange={onChange}
                className="form-input"
                required
              />
            </div>

            <div className="input-group">
              <div className="input-label">To Date</div>
              <input
                type="date"
                name="to"
                value={to}
                onChange={onChange}
                className="form-input"
                disabled={current}
              />
            </div>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="current"
                checked={current}
                onChange={() => setFormData({ ...formData, current: !current })}
                className="checkbox-input"
              />
              <span>I currently study here</span>
            </label>
          </div>

          <div className="input-group">
            <div className="input-label">Program Description</div>
            <textarea
              name="description"
              value={description}
              onChange={onChange}
              className="form-textarea"
              placeholder="Tell us about your program, courses, or key learnings"
              rows="4"
            />
            <small className="input-hint">
              Share details about your educational experience
            </small>
          </div>

          <div className="form-actions">
            <Link to="/dashboard" className="cancel-button">
              Go Back
            </Link>
            <button type="submit" className="submit-button">
              Save Education
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
