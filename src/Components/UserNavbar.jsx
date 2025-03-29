import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../Css/UserNavbar.css";

const UserNavbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();  // Get current URL path

    const toggleMobileMenu = () => {
        setIsMobile(!isMobile);
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
                    <li className={location.pathname === "/logout" ? "active" : ""}>
                        <Link to="/logout">Logout</Link>
                    </li>
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
                        transition={{ duration: 0.5, ease: "easeIn" }}
                    >
                        <li className={location.pathname === "/" ? "active" : ""}>
                            <Link to="/" onClick={toggleMobileMenu}>Dashboard</Link>
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
                        <li className={location.pathname === "/logout" ? "active" : ""}>
                            <Link to="/logout" onClick={toggleMobileMenu}>Logout</Link>
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default UserNavbar;
