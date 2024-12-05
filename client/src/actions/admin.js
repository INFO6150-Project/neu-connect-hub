import api from "../utils/api";
import { LOGOUT } from "./types";
import { setAlert } from "./alert";
import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOADED,
  ADMIN_AUTH_ERROR,
  GET_USERS,
  USERS_ERROR,
} from "./types";

// Admin Login
export const adminLogin = (email, password) => async (dispatch) => {
  try {
    const res = await api.post("/admin/login", { email, password });

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: res.data, // Contains token
    });

    localStorage.setItem("adminToken", res.data.token); // Store token
    dispatch(loadAdmin());
  } catch (err) {
    if (err.response?.data?.errors) {
      err.response.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, "danger"))
      );
    }
    dispatch({ type: ADMIN_LOGIN_FAIL });
  }
};

// Load Admin
export const loadAdmin = () => async (dispatch) => {
  try {
    const res = await api.get("/admin/auth");

    dispatch({
      type: ADMIN_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: ADMIN_AUTH_ERROR });
  }
};

// Get all users (Admin only)
export const getUsers = () => async (dispatch) => {
  try {
    const res = await api.get("/admin/users");

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status },
    });
  }
};
export const logout = () => (dispatch) => {
  // Remove tokens from localStorage
  localStorage.removeItem("adminToken");

  // Dispatch logout action
  dispatch({ type: LOGOUT });
};

