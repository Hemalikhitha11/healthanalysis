import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Css/Login.css';

function Login() {
    const [patientId, setPatientId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    // Track viewport width for responsive adjustments
    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!patientId.trim()) {
            setError('Please enter your patient ID');
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ patientId })
            });
            
            const data = await res.json();
            
            if (res.ok) {
                localStorage.setItem('userId', data.userId);
                navigate('/');
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError('Connection error. Please check your internet connection and try again.');
        } finally {
            setLoading(false);
        }
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
                            placeholder={viewportWidth < 380 ? "P-1234567" : "Enter your patient ID (e.g., P-1234567)"}
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            autoComplete="off"
                            aria-required="true"
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
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