import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Alert.css";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 && (
    <div className="alert-wrapper">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          data-alert-id={alert.id}
          className={`alert alert-${alert.alertType}`}
        >
          {alert.msg}
        </div>
      ))}
    </div>
  );

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Alert);
