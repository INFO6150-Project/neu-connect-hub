// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/layout/Navbar";
// import Landing from "./components/layout/Landing";

// import Register from "./components/auth/Register";
// import Login from "./components/auth/Login";
// import Alert from "./components/layout/Alert";
// import Dashboard from "./components/dashboard/Dashboard";
// import ProfileForm from "./components/profile-forms/ProfileForm";
// import AddExperience from "./components/profile-forms/AddExperience";
// import AddEducation from "./components/profile-forms/AddEducation";
// import Profiles from "./components/profiles/Profiles";
// import Profile from "./components/profile/Profile";
// import Posts from "./components/posts/Posts";
// import Post from "./components/post/Post";
// import NotFound from "./components/layout/NotFound";
// import PrivateRoute from "./components/routing/PrivateRoute";
// import PrivateAdminRoute from "./components/routing/PrivateAdminRoute"; // Add this
// import AdminLogin from "./components/admin/AdminLogin"; // Add this
// import AdminDashboard from "./components/admin/AdminDashboard"; // Add this
// import { LOGOUT } from "./actions/types";

// // Redux
// import { Provider } from "react-redux";
// import store from "./store";
// import { loadUser } from "./actions/auth";
// import setAuthToken from "./utils/setAuthToken";

// import "./App.css";
// import Footer from "./components/layout/Footer";

// const App = () => {
//   // Dark mode state
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("darkMode") === "true"
//   );

//   // Apply dark mode class to body
//   useEffect(() => {
//     if (darkMode) {
//       document.body.classList.add("dark-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//     }
//     localStorage.setItem("darkMode", darkMode);
//   }, [darkMode]);

//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   useEffect(() => {
//     if (localStorage.token) {
//       setAuthToken(localStorage.token);
//     }
//     store.dispatch(loadUser());

//     window.addEventListener("storage", () => {
//       if (!localStorage.token) store.dispatch({ type: LOGOUT });
//     });
//   }, []);

//   return (
//     <Provider store={store}>
//       <Router>
//         <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
//         <Alert />
//         <div
//           className={darkMode ? "app-container dark" : "app-container light"}
//         >
//           <Routes>
//             <Route path="/" element={<Landing />} />
//             <Route path="register" element={<Register />} />
//             <Route path="login" element={<Login />} />
//             <Route path="profiles" element={<Profiles />} />
//             <Route path="profile/:id" element={<Profile />} />
//             <Route
//               path="dashboard"
//               element={<PrivateRoute component={Dashboard} />}
//             />
//             <Route
//               path="create-profile"
//               element={<PrivateRoute component={ProfileForm} />}
//             />
//             <Route
//               path="edit-profile"
//               element={<PrivateRoute component={ProfileForm} />}
//             />
//             <Route
//               path="add-experience"
//               element={<PrivateRoute component={AddExperience} />}
//             />
//             <Route
//               path="add-education"
//               element={<PrivateRoute component={AddEducation} />}
//             />
//             <Route path="posts" element={<PrivateRoute component={Posts} />} />
//             <Route
//               path="posts/:id"
//               element={<PrivateRoute component={Post} />}
//             />
//             <Route path="/*" element={<NotFound />} />
//           </Routes>
//           <Footer />
//         </div>
//       </Router>
//     </Provider>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import ProfileForm from "./components/profile-forms/ProfileForm";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/layout/NotFound";
import PrivateRoute from "./components/routing/PrivateRoute";
import PrivateAdminRoute from "./components/routing/PrivateAdminRoute";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import Footer from "./components/layout/Footer";
import { LOGOUT } from "./actions/types";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Alert />
        <div
          className={darkMode ? "app-container dark" : "app-container light"}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route
              path="dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route
              path="create-profile"
              element={<PrivateRoute component={ProfileForm} />}
            />
            <Route
              path="edit-profile"
              element={<PrivateRoute component={ProfileForm} />}
            />
            <Route
              path="add-experience"
              element={<PrivateRoute component={AddExperience} />}
            />
            <Route
              path="add-education"
              element={<PrivateRoute component={AddEducation} />}
            />
            <Route path="posts" element={<PrivateRoute component={Posts} />} />
            <Route
              path="posts/:id"
              element={<PrivateRoute component={Post} />}
            />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateAdminRoute>
                  <AdminDashboard />
                </PrivateAdminRoute>
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
