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
    
    const [errors, setErrors] = useState({});
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState('');
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const [touchedFields, setTouchedFields] = useState({});
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        
        // Mark field as touched
        if (!touchedFields[name]) {
            setTouchedFields(prev => ({
                ...prev,
                [name]: true
            }));
        }
    };

    // Handle field blur for validation
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouchedFields(prev => ({
            ...prev,
            [name]: true
        }));
    };

    // Validate individual field
    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                if (!/^[a-zA-Z\s.'-]+$/.test(value)) return 'Name contains invalid characters';
                return '';
                
            case 'age':
                if (!value) return 'Age is required';
                if (isNaN(value) || parseInt(value) <= 0) return 'Age must be a positive number';
                if (parseInt(value) > 120) return 'Age must be less than 120';
                return '';
                
            case 'gender':
                if (!value) return 'Gender selection is required';
                return '';
                
            case 'weight':
                if (!value) return 'Weight is required';
                if (isNaN(value) || parseFloat(value) <= 0) return 'Weight must be a positive number';
                if (parseFloat(value) < 2) return 'Weight seems too low';
                if (parseFloat(value) > 500) return 'Weight must be less than 500 kg';
                return '';
                
            case 'height':
                if (!value) return 'Height is required';
                if (isNaN(value) || parseFloat(value) <= 0) return 'Height must be a positive number';
                if (parseFloat(value) < 50) return 'Height seems too low';
                if (parseFloat(value) > 250) return 'Height must be less than 250 cm';
                return '';
                
            case 'bloodGroup':
                if (!value) return 'Blood group selection is required';
                return '';
                
            case 'address':
                if (!value.trim()) return 'Address is required';
                if (value.trim().length < 5) return 'Please enter a complete address';
                return '';
                
            default:
                return '';
        }
    };

    // Validate form data and return any errors
    const validateForm = () => {
        const newErrors = {};
        
        Object.keys(formData).forEach(key => {
            if (key !== 'patientId') { // Skip patientId validation as it's auto-generated
                const error = validateField(key, formData[key]);
                if (error) newErrors[key] = error;
            }
        });
        
        return newErrors;
    };

    // Calculate BMI whenever height or weight changes
    useEffect(() => {
        if (formData.height && formData.weight) {
            const heightError = validateField('height', formData.height);
            const weightError = validateField('weight', formData.weight);
            
            if (!heightError && !weightError) {
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
        } else {
            setBmi(null);
            setBmiCategory('');
        }
    }, [formData.height, formData.weight]);

    // Update errors whenever form data or touched fields change
    useEffect(() => {
        const newErrors = {};
        
        // Only validate touched fields to avoid overwhelming the user
        Object.keys(touchedFields).forEach(field => {
            if (touchedFields[field]) {
                const error = validateField(field, formData[field]);
                if (error) newErrors[field] = error;
            }
        });
        
        setErrors(newErrors);
    }, [formData, touchedFields]);

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const formErrors = validateForm();
        
        // Mark all fields as touched
        const allTouched = {};
        Object.keys(formData).forEach(key => {
            if (key !== 'patientId') { // Skip patientId
                allTouched[key] = true;
            }
        });
        setTouchedFields(allTouched);
        
        // If there are errors, don't submit
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setFormError('Please correct the form');
            return;
        }
        
        setLoading(true);
        setFormError('');
        
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
                setFormError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setFormError('Connection error. Please check your internet connection and try again.');
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
                
                <form onSubmit={handleRegister} noValidate>
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
                                onBlur={handleBlur}
                                className={errors.name && touchedFields.name ? 'input-error' : ''}
                                aria-invalid={errors.name ? 'true' : 'false'}
                                aria-describedby={errors.name ? 'name-error' : undefined}
                            />
                            {errors.name && touchedFields.name && (
                                <p className="field-error" id="name-error">{errors.name}</p>
                            )}
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="age">Age*</label>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                placeholder="30"
                                min="1"
                                max="120"
                                value={formData.age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.age && touchedFields.age ? 'input-error' : ''}
                                aria-invalid={errors.age ? 'true' : 'false'}
                                aria-describedby={errors.age ? 'age-error' : undefined}
                            />
                            {errors.age && touchedFields.age && (
                                <p className="field-error" id="age-error">{errors.age}</p>
                            )}
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="gender">Gender*</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.gender && touchedFields.gender ? 'input-error' : ''}
                                aria-invalid={errors.gender ? 'true' : 'false'}
                                aria-describedby={errors.gender ? 'gender-error' : undefined}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && touchedFields.gender && (
                                <p className="field-error" id="gender-error">{errors.gender}</p>
                            )}
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="weight">Weight (kg)*</label>
                            <input
                                id="weight"
                                name="weight"
                                type="number"
                                placeholder="70"
                                step="0.1"
                                value={formData.weight}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.weight && touchedFields.weight ? 'input-error' : ''}
                                aria-invalid={errors.weight ? 'true' : 'false'}
                                aria-describedby={errors.weight ? 'weight-error' : undefined}
                            />
                            {errors.weight && touchedFields.weight && (
                                <p className="field-error" id="weight-error">{errors.weight}</p>
                            )}
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="height">Height (cm)*</label>
                            <input
                                id="height"
                                name="height"
                                type="number"
                                placeholder="170"
                                step="0.1"
                                value={formData.height}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.height && touchedFields.height ? 'input-error' : ''}
                                aria-invalid={errors.height ? 'true' : 'false'}
                                aria-describedby={errors.height ? 'height-error' : undefined}
                            />
                            {errors.height && touchedFields.height && (
                                <p className="field-error" id="height-error">{errors.height}</p>
                            )}
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="bloodGroup">Blood Group*</label>
                            <select
                                id="bloodGroup"
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.bloodGroup && touchedFields.bloodGroup ? 'input-error' : ''}
                                aria-invalid={errors.bloodGroup ? 'true' : 'false'}
                                aria-describedby={errors.bloodGroup ? 'bloodGroup-error' : undefined}
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
                            {errors.bloodGroup && touchedFields.bloodGroup && (
                                <p className="field-error" id="bloodGroup-error">{errors.bloodGroup}</p>
                            )}
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
                            onBlur={handleBlur}
                            rows="3"
                            className={errors.address && touchedFields.address ? 'input-error' : ''}
                            aria-invalid={errors.address ? 'true' : 'false'}
                            aria-describedby={errors.address ? 'address-error' : undefined}
                        ></textarea>
                        {errors.address && touchedFields.address && (
                            <p className="field-error" id="address-error">{errors.address}</p>
                        )}
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
                    
                    {formError && <p className="form-error">{formError}</p>}
                </form>
                
                <p className="login-link">
                    Already registered? <Link to="/">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;