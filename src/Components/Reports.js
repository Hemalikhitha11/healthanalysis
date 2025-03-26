import React, { useState, useEffect } from 'react';
import '../Css/Reports.css';

function Reports() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch('http://localhost:5000/api/reports', {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      } else {
        window.location.href = '/login';
      }
    };
    fetchReports();
  }, []);

  const handleFileSelect = async (event) => {
    const formData = new FormData();
    formData.append('report', event.target.files[0]);
    const res = await fetch('http://localhost:5000/api/upload-report', {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      setFiles(prev => [...prev, { ...data, fileName: event.target.files[0].name }]);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    const formData = new FormData();
    formData.append('report', event.dataTransfer.files[0]);
    const res = await fetch('http://localhost:5000/api/upload-report', {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      setFiles(prev => [...prev, { ...data, fileName: event.dataTransfer.files[0].name }]);
    }
  };

  const handleChat = async (reportId) => {
    const res = await fetch('http://localhost:5000/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ message: chatMessage, reportId })
    });
    const data = await res.json();
    setChatResponse(data.response);
  };

  return (
    <div className="main">
      <h2>Reports</h2>
      <div className={isDragging ? "upload-area dragging" : "upload-area"}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          <div className="upload-icon">📤</div>
          <h3>Upload Medical Reports</h3>
          <p>Drag and drop or click to upload</p>
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
          <h3>Uploaded Reports</h3>
          <div className="files-grid">
            {files.map((file, index) => (
              <div key={index} className="file-card">
                <div className="file-icon">🔒</div>
                <div className="file-info">
                  <p className="file-name">{file.fileName}</p>
                  <p className="file-size">{file.analysis.slice(0, 50)}...</p>
                  <p className="file-date">
                    Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="chatbot-section">
        <h3>Health Assistant</h3>
        <input
          type="text"
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          placeholder="Ask about a report or general health..."
        />
        <button onClick={() => handleChat(files[0]?._id)}>Send</button>
        {chatResponse && <p>{chatResponse}</p>}
      </div>
    </div>
  );
}

export default Reports;