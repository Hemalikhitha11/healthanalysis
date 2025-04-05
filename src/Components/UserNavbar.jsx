import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../Css/UserNavbar.css";

const UserNavbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    const toggleMobileMenu = () => {
        setIsMobile(!isMobile);
    };

    useEffect(() => {
        // Update login state from localStorage
        const userData = localStorage.getItem("userData");
        setIsLoggedIn(!!userData);
    }, [location]); // Update when location changes

    // Renders either Login or Logout button based on path and auth
    const renderAuthLink = () => {
        const currentPath = location.pathname;

        if (currentPath === "/login" || currentPath === "/register") {
            return (
                <li className={currentPath === "/login" ? "active" : ""}>
                    <Link to="/login">Login</Link>
                </li>
            );
        }

        if (isLoggedIn) {
            return (
                <li className={currentPath === "/logout" ? "active" : ""}>
                    <Link to="/logout">Logout</Link>
                </li>
            );
        } else {
            return (
                <li className={currentPath === "/login" ? "active" : ""}>
                    <Link to="/login">Login</Link>
                </li>
            );
        }
    };

    return (
        <nav className="usernavbar">
            <h2 className="userlogo">
                <Link to="/">Medi<span>Report</span></Link>
            </h2>

            <div className="usernav-container">
                <ul className="usernav-links">
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
                    {renderAuthLink()}
                </ul>

                <button className="usermenu-icon" onClick={toggleMobileMenu}>
                    ☰
                </button>
            </div>

            {/* Animated Mobile Menu */}
            <AnimatePresence>
                {isMobile && (
                    <motion.ul
                        className="usernav-links-mobile"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <li className={location.pathname === "/home" ? "active" : ""}>
                            <Link to="/home" onClick={toggleMobileMenu}>Dashboard</Link>
                        </li>
                        <li className={location.pathname === "/alerts" ? "active" : ""}>
                            <Link to="/alerts" onClick={toggleMobileMenu}>Health Alerts</Link>
                        </li>
                        <li className={location.pathname === "/reports" ? "active" : ""}>
                            <Link to="/reports" onClick={toggleMobileMenu}>My Reports</Link>
                        </li>
                        <li className={location.pathname === "/profile" ? "active" : ""}>
                            <Link to="/profile" onClick={toggleMobileMenu}>Profile</Link>
                        </li>
                        {(location.pathname === "/login" || location.pathname === "/register") ? (
                            <li className={location.pathname === "/login" ? "active" : ""}>
                                <Link to="/login" onClick={toggleMobileMenu}>Login</Link>
                            </li>
                        ) : isLoggedIn ? (
                            <li className={location.pathname === "/logout" ? "active" : ""}>
                                <Link to="/logout" onClick={toggleMobileMenu}>Logout</Link>
                            </li>
                        ) : (
                            <li className={location.pathname === "/login" ? "active" : ""}>
                                <Link to="/login" onClick={toggleMobileMenu}>Login</Link>
                            </li>
                        )}
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default UserNavbar;
