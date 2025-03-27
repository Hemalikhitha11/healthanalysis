// src/components/Logout.js
import React, { useState, useEffect } from 'react';
import '../../Css/UserHome.css'; // Assuming this is your base styling
import '../../Css/Logout.css'; // New CSS file for logout-specific styles
import { useNavigate } from 'react-router-dom'; // For redirect after logout
import { motion } from "framer-motion";

//import React, { useState } from 'react';
//import '../../Css/Reports.css';
//import { motion } from "framer-motion";

function Logout() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();

  // Secure session clearing function
  const clearSecureSession = () => {
    // Clear all local storage
    localStorage.clear();
    // Clear session storage
    sessionStorage.clear();
    // Clear cookies (basic implementation - in production use proper cookie management)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  };

  // Handle logout with security measures
  const handleLogout = () => {
    try {
      // Simulate API call to invalidate session on server
      setLogoutMessage('Processing secure logout...');
      
      // Clear all session data
      clearSecureSession();

      // Simulate server-side logout delay
      setTimeout(() => {
        // Prevent session fixation by generating new session ID (simulated)
        const newSessionId = crypto.randomUUID();
        localStorage.setItem('sessionId', newSessionId); // In real app, this would be server-side
        
        setLogoutMessage('Logout successful. Redirecting...');
        
        // Secure redirect after logout
        setTimeout(() => {
          navigate('/login', { 
            replace: true, // Prevent back button navigation
            state: { loggedOut: true }
          });
        }, 1000);
      }, 1000);
    } catch (error) {
      console.error('Logout error:', error);
      setLogoutMessage('Error during logout. Please try again.');
    }
  };

  // Prevent unauthorized access
  useEffect(() => {
    // Check if user is actually logged in (simulated)
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <div className="main">
        <div className="logout-container">
          <div className="health-bg-animation">
            <div className="pulse-circle circle-1"></div>
            <div className="pulse-circle circle-2"></div>
            <div className="pulse-circle circle-3"></div>
          </div>

          <div className="content-wrapper">
            <h2 className="page-title">
              <span className="title-icon">🔒</span> Secure Logout
            </h2>

            <div className="logout-content">
              <p className="logout-info">
                Are you sure you want to logout? This will end your session securely
                and clear all local data.
              </p>

              {!showConfirm ? (
                <button
                  className="logout-button"
                  onClick={() => setShowConfirm(true)}
                >
                  Initiate Logout
                </button>
              ) : (
                <div className="confirm-section">
                  <p>Confirm secure logout?</p>
                  <div className="confirm-buttons">
                    <button
                      className="confirm-button"
                      onClick={handleLogout}
                    >
                      Yes, Logout
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setShowConfirm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {logoutMessage && (
                <p className="logout-message">{logoutMessage}</p>
              )}
            </div>

            <div className="security-notice">
              <p>🔐 Security Features:</p>
              <ul>
                <li>Session data cleared</li>
                <li>Cookies invalidated</li>
                <li>Secure redirect</li>
                <li>Session fixation prevention</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logout;