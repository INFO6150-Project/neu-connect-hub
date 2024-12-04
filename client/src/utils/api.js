// import axios from 'axios';
// import store from '../store';
// import { LOGOUT } from '../actions/types';

// // Create an instance of axios
// const api = axios.create({
//   baseURL: '/api',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });
// /*
//   NOTE: intercept any error responses from the api
//  and check if the token is no longer valid.
//  ie. Token has expired or user is no longer
//  authenticated.
//  logout the user if the token has expired
// */

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response.status === 401) {
//       store.dispatch({ type: LOGOUT });
//     }
//     return Promise.reject(err);
//   }
// );

// export default api;
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include token dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Changed from "authToken" to "token"
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;