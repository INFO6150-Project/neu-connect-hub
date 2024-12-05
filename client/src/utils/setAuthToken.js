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

const setAuthToken = (token, isAdmin = false) => {
  const key = isAdmin ? "adminToken" : "token";

  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem(key, token);
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
    localStorage.removeItem(key);
  }
};

export default setAuthToken;

