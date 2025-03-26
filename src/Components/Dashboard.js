import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../Css/Dashboard.css';

const dashboardVariants = {
 initial: { opacity: 0, y: 50 },
 animate: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

function Dashboard() {
 const [data, setData] = useState({});

 useEffect(() => {
 const fetchData = async () => {
 const res = await fetch('http://localhost:5000/api/dashboard', {
 credentials: 'include'
 });
 if (res.ok) {
 const json = await res.json();
 setData(json);
 } else {
 window.location.href = '/login';
 }
 };
 fetchData();
 }, []);

 return (
 <motion.div 
 className="dashboard-container main"
 variants={dashboardVariants}
 initial="initial"
 animate="animate"
 >
 <div className="hospital-background">
 <div className="hospital-overlay"></div>
 </div>
 
 <h1 className="dashboard-title">Health Dashboard</h1>
 
 <div className="insights-grid">
 <div className="insight-card">
 <h3>Blood Pressure</h3>
 <p>{data.bp || 'N/A'}</p>
 </div>
 <div className="insight-card">
 <h3>Heartbeat</h3>
 <p>{data.heartbeat || 'N/A'}</p>
 </div>
 <div className="insight-card">
 <h3>Cholesterol</h3>
 <p>{data.cholesterol || 'N/A'}</p>
 </div>
 <div className="insight-card">
 <h3>Next Visit</h3>
 <p>{data.nextVisit || 'N/A'}</p>
 </div>
 <div className="insight-card">
 <h3>Treating Doctor</h3>
 <p>{data.doctor || 'N/A'}</p>
 </div>
 </div>
 </motion.div>
 );
}

export default Dashboard;