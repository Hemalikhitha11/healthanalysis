import React, {useState,useEffect} from "react";
import { motion } from "framer-motion";
import profile from "../../Images/profile.jpeg";
import ECG from "../../Components/ECG";
import "../../Css/UserHome.css";

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } }
};

const Home = () => {
    const [userData, setUserData] = useState();
    const storedData = JSON.parse(localStorage.getItem("userData")) || {};

    useEffect(() => {
        const updateUserData = () => {
            const data = JSON.parse(localStorage.getItem("userData")) || {};
            setUserData(data);
        };

        window.addEventListener("userDataUpdated", updateUserData);
        updateUserData();

        return () => {
            window.removeEventListener("userDataUpdated", updateUserData);
        };
    }, []);

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="main">
                <div className="home-container">
                    {/* Left Profile Section */}
                    <motion.div
                        className="home-left"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="img-block">
                            <img src={storedData.profileImage} alt="Profile" className="profile-image" />
                        </div>
                        <h1 className="name"> {storedData.name || "N/A"} </h1>

                        <div className="personal-details">
                            <h3 className="section-title">Personal Information</h3>
                            <p className="detail"><strong>Age:</strong> {storedData.age || "N/A"}</p>
                            <p className="detail"><strong>PatientId:</strong> {storedData.patientId || "N/A"}</p>
                            <p className="detail"><strong>Gender:</strong> {storedData.gender || "N/A"}</p>
                            <p className="detail"><strong>Phone Number:</strong> {storedData.phone || "N/A"}</p>
                            <p className="detail"><strong>Weight:</strong> {storedData.weight || "N/A"} kg</p>
                            <p className="detail"><strong>Height:</strong> {storedData.height || "N/A"} cm</p>
                            <p className="detail"><strong>Address:</strong> {storedData.address || "N/A"}</p>
                        </div>

                        <div className="medical-info">
                            <h3 className="section-title">Medical Information</h3>
                            <p className="detail"><strong>Blood Group:</strong> {storedData.bloodGroup || "N/A"} </p>
                            <p className="detail"><strong>BMI:</strong> {storedData.bmi || "N/A"} bmi</p>
                            <p className="detail"><strong>Allergies:</strong> None</p>
                            <p className="detail"><strong>Chronic Conditions:</strong> Hypertension</p>
                            <p className="detail"><strong>Medications:</strong> Prescribed Blood Pressure Medication</p>
                            <p className="detail"><strong>Last Checkup:</strong> 15th March 2025</p>
                        </div>
                    </motion.div>

                    {/* Right Medical & Activity Section */}
                    <motion.div
                        className="home-right"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Medical Info Cards */}
                        <div className="medi-info">
                            {[
                                { title: "Blood Pressure", value: "120/80", unit: "mmHg", icon: "❤️", showECG: true },
                                { title: "Heart Rate", value: "80", unit: "bpm", icon: "🩺", showECG: true },
                                { title: "Oxygen Level", value: "98", unit: "%", icon: "🫁", showECG: true },
                                { title: "Temperature", value: "98.6", unit: "°F", icon: "🌡️", showECG: true },
                                { title: "Blood Sugar", value: "110", unit: "mg/dl", icon: "🩸", showECG: false },
                                { title: "Cholesterol", value: "180", unit: "mg/dl", icon: "🩸", showECG: false }
                            ].map((item, index) => (
                                <div key={index} className="card-medi">
                                    <div className="top-info">
                                        <span className="icon">{item.icon}</span>
                                        <span className="title">{item.title}</span>
                                    </div>
                                    <h1>
                                        {item.value} <span className="unit">{item.unit}</span>
                                    </h1>
                                    {item.showECG && <ECG />} {/* Show ECG for relevant cards */}
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <h1 className="section-title">Recent Activity</h1>
                        <div className="activity">
                            {["Appointment Scheduled", "Medication Refill", "Checkup", "Blood Test"].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="activity-block"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.3, duration: 0.5 }}
                                >
                                    <p className="activity-title">{item}</p>
                                    <p className="activity-date">
                                        {index === 0 ? "20th March 2025" :
                                            index === 1 ? "15th March 2025" :
                                                index === 2 ? "10th March 2025" :
                                                    "10th April 2025"}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Appointments */}
                        <h1 className="section-title">Appointments</h1>
                        <div className="appointments">
                            {[
                                { doctor: "Dr. Sakura Haruno", date: "20th March 2025", time: "10:00 AM" },
                                { doctor: "Dr. Shikamaru Nara", date: "25th March 2025", time: "11:00 AM" },
                                { doctor: "Dr. Ino Yamanaka", date: "30th March 2025", time: "10:30 AM" }
                            ].map((appointment, index) => (
                                <motion.div
                                    key={index}
                                    className="appointment"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.3, duration: 0.5 }}
                                >
                                    <h3 className="doctor">{appointment.doctor}</h3>
                                    <p className="date">Date: {appointment.date}</p>
                                    <p className="time">Time: {appointment.time}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Home;
