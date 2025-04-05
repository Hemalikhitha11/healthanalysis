// src/Components/UserNavbar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../Css/UserNavbar.css";
import { useAuth } from "../AuthContext";

const UserNavbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { userId } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  // Determine whether to show login or logout
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";
  const showLogin = !userId || isAuthPage;

  return (
    <nav className="usernavbar">
      <h2 className="userlogo">
        <Link to="/">Medi<span>Report</span></Link>
      </h2>

      <div className="usernav-container">
        <ul className="usernav-links">
          {showLogin ? (
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">Login</Link>
            </li>
          ) : (
            <>
              <li className={location.pathname === "/home" ? "active" : ""}>
                <Link to="/home">Dashboard</Link>
              </li>
              <li className={location.pathname === "/alerts" ? "active" : ""}>
                <Link to="/alerts">Health Alerts</Link>
              </li>
              <li className={location.pathname === "/reports" ? "active" : ""}>
                <Link to="/reports">My Reports</Link>
              </li>
              <li className={location.pathname === "/profile" ? "active" : ""}>
                <Link to="/profile">Profile</Link>
              </li>
              <li className={location.pathname === "/logout" ? "active" : ""}>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          )}
        </ul>

        <button className="usermenu-icon" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && (
          <motion.ul
            className="usernav-links-mobile"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeIn" }}
          >
            {showLogin ? (
              <li className={location.pathname === "/" ? "active" : ""}>
                <Link to="/" onClick={toggleMobileMenu}>Login</Link>
              </li>
            ) : (
              <>
                <li><Link to="/home" onClick={toggleMobileMenu}>Dashboard</Link></li>
                <li><Link to="/alerts" onClick={toggleMobileMenu}>Health Alerts</Link></li>
                <li><Link to="/reports" onClick={toggleMobileMenu}>My Reports</Link></li>
                <li><Link to="/profile" onClick={toggleMobileMenu}>Profile</Link></li>
                <li><Link to="/logout" onClick={toggleMobileMenu}>Logout</Link></li>
              </>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default UserNavbar;
