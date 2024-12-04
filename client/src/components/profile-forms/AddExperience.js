import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import "./AddExperience.css";

const AddExperience = ({ addExperience }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await addExperience(formData);
    navigate("/dashboard");
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1 className="form-title">Add Experience</h1>
        <p className="form-subtitle">
          Add your professional experience details
        </p>
      </div>

      <div className="form-section">
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <div className="input-label">Job Title *</div>
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              className="form-input"
              placeholder="Senior Software Engineer"
              required
            />
          </div>

          <div className="input-group">
            <div className="input-label">Company *</div>
            <input
              type="text"
              name="company"
              value={company}
              onChange={onChange}
              className="form-input"
              placeholder="Apple Inc"
              required
            />
          </div>

          <div className="input-group">
            <div className="input-label">Location</div>
            <input
              type="text"
              name="location"
              value={location}
              onChange={onChange}
              className="form-input"
              placeholder="Cupertino, CA"
            />
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
              <span>I currently work here</span>
            </label>
          </div>

          <div className="input-group">
            <div className="input-label">Description</div>
            <textarea
              name="description"
              value={description}
              onChange={onChange}
              className="form-textarea"
              placeholder="Tell us about your role and responsibilities"
              rows="4"
            />
          </div>

          <div className="form-actions">
            <Link to="/dashboard" className="cancel-button">
              Cancel
            </Link>
            <button type="submit" className="submit-button">
              Save Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
