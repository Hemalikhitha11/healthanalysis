import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../Css/UserHome.css";
import human from "../Images/Human.webp";
import doctor1 from "../Images/im.webp";
import doctor2 from "../Images/profile.jpeg";

const pageVariants = {
 initial: { opacity: 0, scale: 0.9, y: 50 },
 animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
 exit: { opacity: 0, scale: 0.9, y: -50, transition: { duration: 0.5, ease: "easeIn" } }
};

const sectionVariants = {
 hidden: { opacity: 0, x: -50 },
 visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const listItemVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: (i) => ({
 opacity: 1,
 y: 0,
 transition: { delay: i * 0.1, duration: 0.5 }
 })
};

const doctors = [
 { name: "Dr. Alan Thompson", specialty: "Gastroenterologist", image: doctor1 },
 { name: "Dr. Michael Roberts", specialty: "Gastroenterologist", image: doctor2 },
 { name: "Dr. Sarah Johnson", specialty: "General Practitioner", image: doctor1 },
 { name: "Dr. Emily Smith", specialty: "Nutritionist", image: doctor2 }
];

const getStatusColor = (issue) => {
 if (issue.includes('severe')) return "#EF4444";
 if (issue.includes('moderate')) return "#FB923C";
 return "#22C55E";
};

function UserHome() {
 const [alerts, setAlerts] = useState([]);
 const [selectedSpecialty, setSelectedSpecialty] = useState("All");

 useEffect(() => {
 const fetchAlerts = async () => {
 const res = await fetch('http://localhost:5000/api/health-alerts', {
 credentials: 'include'
 });
 if (res.ok) {
 const data = await res.json();
 setAlerts(data);
 } else {
 window.location.href = '/login';
 }
 };
 fetchAlerts();
 }, []);

 const filteredDoctors = selectedSpecialty === "All" 
 ? doctors 
 : doctors.filter(doctor => doctor.specialty === selectedSpecialty);

 return (
 <motion.div 
 variants={pageVariants}
 initial="initial"
 animate="animate"
 exit="exit"
 className="main"
 >
 <header className="header">
 <motion.h1 
 initial={{ opacity: 0, y: -20 }} 
 animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
 >
 Health Alerts
 </motion.h1>
 </header>

 <motion.div className="main-content" initial="hidden" animate="visible">
 <motion.aside className="sidebar" variants={sectionVariants}>
 <h2>Severe Symptoms</h2>
 <ul>
 {alerts.map((alert, index) => (
 <motion.li 
 key={index} 
 className="health-item"
 variants={listItemVariants}
 custom={index}
 >
 <span className="icon">⚠️</span>
 <div className="info">
 <h3>{alert.name}</h3>
 <p style={{ color: getStatusColor(alert.issue) }}>
 {alert.issue}
 </p>
 </div>
 </motion.li>
 ))}
 </ul>
 </motion.aside>

 <motion.div 
 className="body-image"
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
 >
 <img src={human} alt="Human Anatomy" />
 </motion.div>

 <motion.aside className="doctors-section" variants={sectionVariants}>
 <h2>Book an Appointment</h2>
 <select 
 className="specialist-dropdown" 
 value={selectedSpecialty} 
 onChange={(e) => setSelectedSpecialty(e.target.value)}
 >
 <option value="All">All</option>
 <option value="Gastroenterologist">Gastroenterologist</option>
 <option value="General Practitioner">General Practitioner</option>
 <option value="Nutritionist">Nutritionist</option>
 </select>
 <div className="doctors-list">
 {filteredDoctors.map((doctor, index) => (
 <motion.div 
 className="doctor-card" 
 key={index}
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
 >
 <img src={doctor.image} alt="Doctor" />
 <p>{doctor.name}</p>
 <span>{doctor.specialty}</span>
 </motion.div>
 ))}
 </div>
 </motion.aside>
 </motion.div>
 </motion.div>
 );
}

export default UserHome;