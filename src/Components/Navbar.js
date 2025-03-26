import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Navbar.css';

function Navbar() {
 return (
 <nav className="navbar">
 <h1 className="logo">🏥 HealthAnalysis</h1>
 <ul className="nav-links">
 <li><Link to="/">Dashboard</Link></li>
 <li><Link to="/health-alerts">Health Alerts</Link></li>
 <li><Link to="/reports">Reports</Link></li>
 <li><Link to="/logout">Logout</Link></li>
 </ul>
 </nav>
 );
}

export default Navbar;