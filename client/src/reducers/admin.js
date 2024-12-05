import {
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    LOGOUT,
    ADMIN_LOADED,
    ADMIN_AUTH_ERROR,
  } from "../actions/types";
  
  const initialState = {
    token: localStorage.getItem("adminToken"),
    isAuthenticated: null,
    loading: true,
    admin: null,
    users: [],
  };
  
  export default function adminReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case ADMIN_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          admin: payload,
        };
      case ADMIN_LOGIN_SUCCESS:
        localStorage.setItem("adminToken", payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
        };
      case LOGOUT:
      case ADMIN_LOGIN_FAIL:
      case ADMIN_AUTH_ERROR:
        localStorage.removeItem("adminToken");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          admin: null,
        };
      default:
        return state;
    }
  }
  