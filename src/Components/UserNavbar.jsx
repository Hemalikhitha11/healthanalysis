import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../Css/UserNavbar.css";

const UserNavbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobile(!isMobile);
    };

    return (
        <nav className="usernavbar">
            <h2 className="userlogo"> <Link>Medi<span>Report</span></Link> </h2>

            <div className="usernav-container">
                <ul className="usernav-links">
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/alerts">Health Alerts</Link></li>
                    <li><Link to="/reports">My Reports</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
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
                        <li><Link to="/" onClick={toggleMobileMenu}>Dashboard</Link></li>
                        <li><Link to="/alerts" onClick={toggleMobileMenu}>Health Alerts</Link></li>
                        <li><Link to="/reports" onClick={toggleMobileMenu}>My Reports</Link></li>
                        <li><Link to="/profile" onClick={toggleMobileMenu}>Profile</Link></li>
                        <li><Link to="/logut" onClick={toggleMobileMenu}>Logout</Link></li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default UserNavbar;
