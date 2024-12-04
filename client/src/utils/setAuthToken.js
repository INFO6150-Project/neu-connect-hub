// import axios from "axios";

// // Store our JWT in localStorage and set axios headers if we have a token
// const setAuthToken = (token) => {
//   if (token) {
//     // Set the default header with the token
//     axios.defaults.headers.common["x-auth-token"] = token;
//     // Store the token in localStorage
//     localStorage.setItem("token", token);
//   } else {
//     // Remove the default header if token is not provided
//     delete axios.defaults.headers.common["x-auth-token"];
//     // Remove the token from localStorage
//     localStorage.removeItem("token");
//   }
// };

// export default setAuthToken;
import axios from "axios";
import api from "./api";

const setAuthToken = (token) => {
  if (token) {
    // Set the token in both axios instances
    axios.defaults.headers.common["x-auth-token"] = token;
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    // Remove the token from both axios instances
    delete axios.defaults.headers.common["x-auth-token"];
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export default setAuthToken;