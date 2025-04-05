import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Css/Login.css';

function Login() {
    const [patientId, setPatientId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    // Track viewport width
    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!patientId.trim()) {
            setError('Please enter your patient ID');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate login
        setTimeout(() => {
            const storedId = localStorage.getItem('patientId');
            if (storedId && storedId === patientId.trim()) {
                console.log("✅ Patient ID matched, navigating to home...");
                localStorage.setItem('userId', patientId.trim()); // Store user ID in local storage
                // navigate('/home'); // <-- check if this logs
                window.location.href = '/home'; // redirect to home page
            
            } else {
                setError('Invalid Patient ID. Please try again or register.');
            }
            setLoading(false);
        }, 800); // simulate network delay
    };

    return (
        <div className="login-container main">
            <div className="login-card">
                <div className="login-header">
                    <h1>Patient Portal</h1>
                    <p className="login-subtitle">
                        {viewportWidth < 380
                            ? 'Enter your ID to continue'
                            : 'Enter your patient ID to access your health information'}
                    </p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="patientId">Patient ID</label>
                        <input
                            id="patientId"
                            type="text"
                            placeholder={viewportWidth < 380 ? "SIM-123456" : "Enter your patient ID (e.g., SIM-123456)"}
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            autoComplete="off"
                            disabled={loading}
                            className='input-field'
                        />
                    </div>
                    <button type="submit" disabled={loading} className='login-button'>
                        <span>{loading ? "Accessing..." : "Access Portal"}</span>
                        {!loading && <i className="arrow-icon">→</i>}
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p className="help-text">
                    Need help? <a href="/help">Contact support</a>
                </p>
                <p className="register-link">
                    New patient? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
