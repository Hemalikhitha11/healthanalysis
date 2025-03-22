import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/UserNavbar"; // Import the Navbar component
import Home from "./Pages/User/Home";
import Reports from "./Pages/User/Reports";
import Profile from "./Pages/User/Profile";
import Alerts from "./Pages/User/HealthAlerts";


const Logut = () => <h1>Profile</h1>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logut />} />
      </Routes>
    </Router>
  );
}

export default App;
