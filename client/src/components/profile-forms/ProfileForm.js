import React, { useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import "./ProfileForm.css";

const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState(initialState);
  const creatingProfile = useMatch("/create-profile");
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) getCurrentProfile();

    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    const editing = profile ? true : false;
    e.preventDefault();
    createProfile(formData, editing).then(() => {
      if (!editing) navigate("/dashboard");
    });
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1 className="form-title">
          {creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
        </h1>
        <p className="form-subtitle">
          {creatingProfile
            ? "Let's get some information to make your profile"
            : "Add some changes to your profile"}
        </p>
      </div>

      <div className="form-section">
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <div className="input-label">Professional Status *</div>
            <select
              name="status"
              value={status}
              onChange={onChange}
              className="form-select"
              required
            >
              <option value="">Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="input-hint">
              Give us an idea of where you are at in your career
            </small>
          </div>

          <div className="input-group">
            <div className="input-label">Company</div>
            <input
              type="text"
              name="company"
              value={company}
              onChange={onChange}
              className="form-input"
              placeholder="Company name"
            />
            <small className="input-hint">
              Could be your own company or one you work for
            </small>
          </div>

          <div className="input-group">
            <div className="input-label">Website</div>
            <input
              type="text"
              name="website"
              value={website}
              onChange={onChange}
              className="form-input"
              placeholder="Website URL"
            />
            <small className="input-hint">
              Could be your own or a company website
            </small>
          </div>

          <div className="input-group">
            <div className="input-label">Location</div>
            <input
              type="text"
              name="location"
              value={location}
              onChange={onChange}
              className="form-input"
              placeholder="City, State"
            />
            <small className="input-hint">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>

          <div className="input-group">
            <div className="input-label">Skills *</div>
            <input
              type="text"
              name="skills"
              value={skills}
              onChange={onChange}
              className="form-input"
              placeholder="HTML, CSS, JavaScript"
              required
            />
            <small className="input-hint">
              Please use comma separated values (eg. HTML, CSS, JavaScript, PHP)
            </small>
          </div>

          <div className="input-group">
            <div className="input-label">Github Username</div>
            <input
              type="text"
              name="githubusername"
              value={githubusername}
              onChange={onChange}
              className="form-input"
              placeholder="Github username"
            />
            <small className="input-hint">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>

          <div className="input-group">
            <div className="input-label">Bio</div>
            <textarea
              name="bio"
              value={bio}
              onChange={onChange}
              className="form-textarea"
              placeholder="Tell us about yourself"
              rows="4"
            />
            <small className="input-hint">
              Tell us a little about yourself
            </small>
          </div>

          <div className="social-toggle">
            <button
              type="button"
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              className="toggle-button"
            >
              Add Social Network Links
            </button>
            <span className="optional-text">Optional</span>
          </div>

          {displaySocialInputs && (
            <div className="social-inputs">
              <div className="input-group">
                <div className="input-label">Twitter</div>
                <input
                  type="text"
                  name="twitter"
                  value={twitter}
                  onChange={onChange}
                  className="form-input"
                  placeholder="Twitter URL"
                />
              </div>

              <div className="input-group">
                <div className="input-label">Facebook</div>
                <input
                  type="text"
                  name="facebook"
                  value={facebook}
                  onChange={onChange}
                  className="form-input"
                  placeholder="Facebook URL"
                />
              </div>

              <div className="input-group">
                <div className="input-label">LinkedIn</div>
                <input
                  type="text"
                  name="linkedin"
                  value={linkedin}
                  onChange={onChange}
                  className="form-input"
                  placeholder="LinkedIn URL"
                />
              </div>

              <div className="input-group">
                <div className="input-label">YouTube</div>
                <input
                  type="text"
                  name="youtube"
                  value={youtube}
                  onChange={onChange}
                  className="form-input"
                  placeholder="YouTube URL"
                />
              </div>

              <div className="input-group">
                <div className="input-label">Instagram</div>
                <input
                  type="text"
                  name="instagram"
                  value={instagram}
                  onChange={onChange}
                  className="form-input"
                  placeholder="Instagram URL"
                />
              </div>
            </div>
          )}

          <div className="form-actions">
            <Link to="/dashboard" className="cancel-button">
              Go Back
            </Link>
            <button type="submit" className="submit-button">
              {creatingProfile ? "Create Profile" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
