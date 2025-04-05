import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Css/Navbar.css';

function Navbar() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, [location]); // Update navbar on route change

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="usernavbar">
      <h1 className="userlogo">🏥 Health<span>Analysis</span></h1>
      <ul className="usernav-links">
        {isLoggedIn && !isAuthPage && (
          <>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/health-alerts">Health Alerts</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </>
        )}
        {!isLoggedIn && !isAuthPage && (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
