import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../Css/UserHome.css";
import human from "../../Images/Human.webp"; 
import doctor1 from "../../Images/im.webp";
import doctor2 from "../../Images/profile.jpeg";

// Page animation
const pageVariants = {
    initial: { opacity: 0, scale: 0.9, y: 50 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, y: -50, transition: { duration: 0.5, ease: "easeIn" } }
};

// Sidebar & Doctor section animations
const sectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

// List item animation (staggered)
const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5 }
    })
};

// Sample health data
const healthReport = [
    { name: "Liver", status: "Normal" },
    { name: "Large Intestine", status: "Normal" },
    { name: "Gallbladder", status: "Impaired Bile Flow", severity: "Moderate" },
    { name: "Stomach", status: "Erosive Gastritis", severity: "Severe" },
    { name: "Small Intestine", status: "No Abnormal Findings" },
    { name: "Pancreas", status: "Normal Function" },
    { name: "Esophagus", status: "Mild Esophagitis", severity: "Mild" },
    { name: "Duodenum", status: "No Inflammation" }
];

// Sample doctor data
const doctors = [
    { name: "Dr. Alan Thompson", specialty: "Gastroenterologist", image: doctor1 },
    { name: "Dr. Michael Roberts", specialty: "Gastroenterologist", image: doctor2 },
    { name: "Dr. Sarah Johnson", specialty: "General Practitioner", image: doctor1 },
    { name: "Dr. Emily Smith", specialty: "Nutritionist", image: doctor2 }
];

const getStatusColor = (severity) => {
    switch (severity) {
        case "Mild": return "#FACC15";   // Yellow
        case "Moderate": return "#FB923C"; // Orange
        case "Severe": return "#EF4444"; // Red
        default: return "#22C55E"; // Green (Normal)
    }
};

const HealthAlerts = () => {
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");

    // Filter doctors by specialty
    const filteredDoctors = selectedSpecialty === "All" 
        ? doctors 
        : doctors.filter(doctor => doctor.specialty === selectedSpecialty);

    return (
        <motion.div 
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="health-alerts-container main"
        >
            {/* Hospital Background Effect */}
            <div className="hospital-background">
                <div className="hospital-overlay"></div>
                <div className="hospital-elements">
                    <div className="pulse-effect pulse-1"></div>
                    <div className="pulse-effect pulse-2"></div>
                    <div className="pulse-effect pulse-3"></div>
                </div>
            </div>

            {/* Header */}
            <header className="header">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
                >
                    Health Report
                </motion.h1>
            </header>

            {/* Main Content */}
            <motion.div 
                className="main-content"
                initial="hidden"
                animate="visible"
            >
                {/* Sidebar with Health Conditions */}
                <motion.aside 
                    className="sidebar"
                    variants={sectionVariants}
                >
                    <h2>Health Summary</h2>
                    <ul>
                        {healthReport.map((item, index) => (
                            <motion.li 
                                key={index} 
                                className="health-item"
                                variants={listItemVariants}
                                initial="hidden"
                                animate="visible"
                                custom={index}
                            >
                                <span className="icon">🩺</span>
                                <div className="info">
                                    <h3>{item.name}</h3>
                                    <p style={{ color: getStatusColor(item.severity) }}>
                                        {item.status}
                                    </p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </motion.aside>

                {/* 3D Human Body Representation */}
                <motion.div 
                    className="body-image"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
                >
                    <img src={human} alt="Human Anatomy" />
                </motion.div>

                {/* Doctor Recommendations */}
                <motion.aside 
                    className="doctors-section"
                    variants={sectionVariants}
                >
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
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor, index) => (
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
                            ))
                        ) : (
                            <p>No doctors available for this specialty.</p>
                        )}
                    </div>
                </motion.aside>
            </motion.div>
        </motion.div>
    );
};

export default HealthAlerts;