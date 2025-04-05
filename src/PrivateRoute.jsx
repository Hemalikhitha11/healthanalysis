// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  return children;    
  // const { userId } = useAuth();

  // return userId ? children : <Navigate to="/" />;
};

export default PrivateRoute;
