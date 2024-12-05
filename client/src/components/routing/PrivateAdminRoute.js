import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateAdminRoute = ({ children, admin: { isAuthenticated, loading } }) => {
  if (!isAuthenticated && !loading) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

PrivateAdminRoute.propTypes = {
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(PrivateAdminRoute);
