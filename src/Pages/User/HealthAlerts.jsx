import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } }
};

const HealthAlerts = () => {
    return (
        <motion.div 
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1>Dashboard</h1>
            <p>Welcome to your Health Alerts!</p>
        </motion.div>
    );
};

export default HealthAlerts;
