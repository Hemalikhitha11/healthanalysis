import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserHome from './components/UserHome';
import Reports from './components/Reports';
import Logout from './components/Logout';
import Login from './components/Login';
import Register from './components/Register';
import UserNavbar from './components/UserNavbar'; // Updated import

function App() {
  return (
    <BrowserRouter>
      <UserNavbar /> {/* Updated component */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/alerts" element={<UserHome />} /> {/* Updated path */}
        <Route path="/reports" element={<Reports />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<div>Profile Page (To be implemented)</div>} /> {/* Placeholder */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;