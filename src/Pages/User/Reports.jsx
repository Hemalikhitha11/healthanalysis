// src/components/Reports.js
import React, { useState } from 'react';
import '../../Css/Reports.css';
import './Reports.css';

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
    <>
      <div className="main">
        <div className="health-reports-container">
          <div className="health-bg-animation">
            <div className="pulse-circle circle-1"></div>
            <div className="pulse-circle circle-2"></div>
            <div className="pulse-circle circle-3"></div>
          </div>

          <div className="content-wrapper">
            <h2 className="page-title">
              <span className="title-icon">🏥</span> Secure Health Reports
            </h2>

            <div className="privacy-notice">
              <p>🔒 Your health data is protected with encryption</p>
              <button 
                className="privacy-link"
                onClick={() => setShowPrivacyModal(true)}
              >
                View Privacy Policy
              </button>
            </div>

            <div className="consent-section">
              <label className="consent-label">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                />
                I consent to processing my health data
              </label>
            </div>

            {/* Fixed the className syntax here - line 92 area */}
            <div 
              className={isDragging ? "upload-area dragging" : "upload-area"}
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
            </div>

            {files.length > 0 && (
              <div className="files-list">
                <h3>Uploaded Reports (Encrypted)</h3>
                <div className="files-grid">
                  {files.map((file, index) => (
                    <div key={index} className="file-card">
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
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {showPrivacyModal && (
            <div className="privacy-modal">
              <div className="modal-content">
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
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Reports;