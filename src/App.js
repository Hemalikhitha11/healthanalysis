import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./Pages/User/Home";
import Alerts from "./Pages/User/HealthAlerts";
import Reports from "./Pages/User/Reports";
import Profile from "./Pages/User/Profile";
import UserNavbar from "./Components/UserNavbar";
import Logout from "./Pages/User/Logout";
import Login from "./Components/Login";
import Register from "./Components/Register";

const AnimatedRoutes = () => {
    const location = useLocation(); // Get the current location for animations

    return (
        <AnimatePresence mode="wait"> 
            <Routes location={location} key={location.pathname}>
                <Route path="/home" element={<Dashboard />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
  return (
    <Router>
      <UserNavbar /> {/* Navbar remains outside to persist across pages */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<AnimatedRoutes />} /> {/* Handles all other routes */}
      </Routes>
    </Router>
  );
}

export default App;
