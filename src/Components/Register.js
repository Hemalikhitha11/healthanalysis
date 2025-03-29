import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Css/Register.css';

function Register() {
    const [formData, setFormData] = useState({
        patientId: '',
        name: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
        bloodGroup: '',
        address: ''
    });
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Calculate BMI whenever height or weight changes
    useEffect(() => {
        if (formData.height && formData.weight) {
            // Convert height from cm to meters
            const heightInMeters = parseFloat(formData.height) / 100;
            const weightInKg = parseFloat(formData.weight);
            
            if (heightInMeters > 0 && weightInKg > 0) {
                const calculatedBmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
                setBmi(calculatedBmi);
                
                // Determine BMI category
                if (calculatedBmi < 18.5) {
                    setBmiCategory('Underweight');
                } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
                    setBmiCategory('Normal weight');
                } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
                    setBmiCategory('Overweight');
                } else {
                    setBmiCategory('Obese');
                }
            } else {
                setBmi(null);
                setBmiCategory('');
            }
        } else {
            setBmi(null);
            setBmiCategory('');
        }
    }, [formData.height, formData.weight]);

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name || !formData.age || !formData.gender || !formData.bloodGroup || !formData.address) {
            setError('Please fill in all required fields');
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            // Add BMI to the data being sent to the server
            const dataToSend = {
                ...formData,
                bmi: bmi,
                bmiCategory: bmiCategory
            };
            
            const res = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
            
            const data = await res.json();
            
            if (res.ok) {
                alert(`Registration successful! Your patient ID is: ${data.patientId}`);
                navigate('/login');
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Connection error. Please check your internet connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container main">
            <div className="register-card">
                <div className="register-header">
                    <h1>Patient Registration</h1>
                    <p className="register-subtitle">Please fill in your health information</p>
                </div>
                
                <form onSubmit={handleRegister}>
                    <div className="form-grid">
                        <div className="input-group">
                            <label htmlFor="name">Full Name*</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="age">Age*</label>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                placeholder="30"
                                min="0"
                                max="120"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="gender">Gender*</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="weight">Weight (kg)*</label>
                            <input
                                id="weight"
                                name="weight"
                                type="number"
                                placeholder="70"
                                min="1"
                                step="0.1"
                                value={formData.weight}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="height">Height (cm)*</label>
                            <input
                                id="height"
                                name="height"
                                type="number"
                                placeholder="170"
                                min="50"
                                max="250"
                                value={formData.height}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="bloodGroup">Blood Group*</label>
                            <select
                                id="bloodGroup"
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select blood group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="input-group full-width">
                        <label htmlFor="address">Address*</label>
                        <textarea
                            id="address"
                            name="address"
                            placeholder="123 Main St, City, Country"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    
                    {bmi && (
                        <div className="bmi-result">
                            <h3>BMI Calculation</h3>
                            <div className="bmi-value">
                                <span>Your BMI: <strong>{bmi}</strong></span>
                                <span className={`bmi-category ${bmiCategory.toLowerCase().replace(' ', '-')}`}>
                                    {bmiCategory}
                                </span>
                            </div>
                            <div className="bmi-scale">
                                <div className="scale-item underweight">Underweight</div>
                                <div className="scale-item normal-weight">Normal</div>
                                <div className="scale-item overweight">Overweight</div>
                                <div className="scale-item obese">Obese</div>
                            </div>
                        </div>
                    )}
                    
                    <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : "Register"}
                    </button>
                    
                    {error && <p className="error">{error}</p>}
                </form>
                
                <p className="login-link">
                    Already registered? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;