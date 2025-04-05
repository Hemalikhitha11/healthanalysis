// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./Pages/User/Home";
import Alerts from "./Pages/User/HealthAlerts";
import Reports from "./Pages/User/Reports";
import Profile from "./Pages/User/Profile";
import Logout from "./Pages/User/Logout";
import Login from "./Components/Login";
import Register from "./Components/Register";
import UserNavbar from "./Components/UserNavbar";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes */}
        <Route path="/home" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/alerts" element={<PrivateRoute><Alerts /></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <UserNavbar />
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
