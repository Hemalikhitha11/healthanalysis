// src/Pages/User/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
