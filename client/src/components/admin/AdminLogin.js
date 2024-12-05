import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { adminLogin } from "../../actions/admin";
import PropTypes from "prop-types";
import "./AdminLogin.css";

const AdminLogin = ({ adminLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await adminLogin(email, password);
    } catch (err) {
      console.error("Admin login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
    setIsLoading(false);
  };

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="admin-login-container">
      <div className="login-content">
        <h1 className="login-title">Admin Login</h1>
        <p className="login-subtitle">Sign in to manage your admin panel</p>

        <form className="login-form" onSubmit={onSubmit}>
          <div className="form-field">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="form-input"
              placeholder="Admin Email"
              required
            />
          </div>

          <div className="form-field password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={onChange}
              className="form-input"
              placeholder="Admin Password"
              required
              minLength="6"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className={`login-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? <div className="loading-spinner"></div> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

AdminLogin.propTypes = {
  adminLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.admin.isAuthenticated,
});

export default connect(mapStateToProps, { adminLogin })(AdminLogin);
