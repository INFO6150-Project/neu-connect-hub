import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;

// If a token is provided:

// It adds the token to every Axios request's headers under "x-auth-token"
// This means every request will automatically include this authentication token

// If no token is provided (or it's null/undefined):

// It removes the "x-auth-token" from Axios headers
// This is useful when logging out or when the token expires
