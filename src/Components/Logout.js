import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Logout.css';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('http://localhost:5000/api/logout', {
      method: 'POST',
      credentials: 'include'
    });
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <div className="logout-container main">
      <h1 className="page-title">Logout</h1>
      <div className="logout-content">
        <p>Are you sure you want to logout?</p>
        <button className="logout-button" onClick={handleLogout}>
          Yes, Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;