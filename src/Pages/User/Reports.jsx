import React, { useState } from 'react';
import '../../Css/Reports.css';
import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } }
};

const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
};

const dropAreaVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    dragging: { scale: 1.1, transition: { duration: 0.2 } }
};

function Reports() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const simulateEncryption = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...file,
          encryptedName: btoa(file.name),
          uploadDate: new Date().toISOString()
        });
      }, 500);
    });
  };

  const handleFileSelect = async (event) => {
    if (!consentGiven) {
      alert('Please provide consent before uploading health data');
      return;
    }
    
    const selectedFiles = Array.from(event.target.files);
    const encryptedFiles = await Promise.all(selectedFiles.map(simulateEncryption));
    setFiles(prevFiles => [...prevFiles, ...encryptedFiles]);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    
    if (!consentGiven) {
      alert('Please provide consent before uploading health data');
      return;
    }
    
    const droppedFiles = Array.from(event.dataTransfer.files);
    const encryptedFiles = await Promise.all(droppedFiles.map(simulateEncryption));
    setFiles(prevFiles => [...prevFiles, ...encryptedFiles]);
  };

  return (
    <motion.div 
      className="main"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="health-reports-container">
        <motion.div className="health-bg-animation" variants={fadeVariants}>
          <div className="pulse-circle circle-1"></div>
          <div className="pulse-circle circle-2"></div>
          <div className="pulse-circle circle-3"></div>
        </motion.div>

        <motion.div className="content-wrapper" variants={fadeVariants}>
          <h2 className="page-title">
            <span className="title-icon">🏥</span> Secure Health Reports
          </h2>

          <motion.div className="privacy-notice" variants={fadeVariants}>
            <p>🔒 Your health data is protected with encryption</p>
            <button 
              className="privacy-link"
              onClick={() => setShowPrivacyModal(true)}
            >
              View Privacy Policy
            </button>
          </motion.div>

          <motion.div className="consent-section" variants={fadeVariants}>
            <label className="consent-label">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className='consent-checkbox'
              />
              I consent to processing my health data
            </label>
          </motion.div>

          <motion.div 
            className={isDragging ? "upload-area dragging" : "upload-area"}
            variants={dropAreaVariants}
            initial="initial"
            whileHover="hover"
            animate={isDragging ? "dragging" : "initial"}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="upload-content">
              <div className="upload-icon">📤</div>
              <h3>Upload Health Reports Securely</h3>
              <p>Drag and drop or click to upload (Encrypted Storage)</p>
              <label className="upload-button">
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  hidden
                />
                <span className="button-text">Select Files</span>
              </label>
            </div>
          </motion.div>

          {files.length > 0 && (
            <motion.div className="files-list" variants={fadeVariants}>
              <h3>Uploaded Reports (Encrypted)</h3>
              <div className="files-grid">
                {files.map((file, index) => (
                  <motion.div key={index} className="file-card" variants={fadeVariants}>
                    <div className="file-icon">🔒</div>
                    <div className="file-info">
                      <p className="file-name">{file.name}</p>
                      <p className="file-size">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                      <p className="file-date">
                        Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {showPrivacyModal && (
          <motion.div className="privacy-modal" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
            <motion.div className="modal-content" variants={fadeVariants}>
              <h2>Privacy Policy</h2>
              <p>Your health data is protected under HIPAA regulations:</p>
              <ul>
                <li>All data is encrypted during transit and storage</li>
                <li>Access restricted to authorized personnel only</li>
                <li>Data used solely for health analysis purposes</li>
                <li>You can request data deletion at any time</li>
              </ul>
              <button 
                className="close-modal"
                onClick={() => setShowPrivacyModal(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Reports;
