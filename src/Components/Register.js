import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../Css/Register.css';

function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        patientId: '',
        name: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
        bloodGroup: '',
        address: '',
        phone: '',
        profileImage: null
    });

    const [errors, setErrors] = useState({});
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState('');
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const [touchedFields, setTouchedFields] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (!touchedFields[name]) {
            setTouchedFields(prev => ({
                ...prev,
                [name]: true
            }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouchedFields(prev => ({
            ...prev,
            [name]: true
        }));
    };

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
            case 'phone':
                if (!value.trim()) return 'Phone number is required';
                if (!/^\d{10}$/.test(value)) return 'Phone number must be 10 digits';
                return '';
            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (key !== 'patientId' && key !== 'profileImage') {
                const error = validateField(key, formData[key]);
                if (error) newErrors[key] = error;
            }
        });
        return newErrors;
    };

    useEffect(() => {
        if (formData.height && formData.weight) {
            const heightError = validateField('height', formData.height);
            const weightError = validateField('weight', formData.weight);

            if (!heightError && !weightError) {
                const heightInMeters = parseFloat(formData.height) / 100;
                const weightInKg = parseFloat(formData.weight);
                const calculatedBmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
                setBmi(calculatedBmi);

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

    useEffect(() => {
        const newErrors = {};
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
        const formErrors = validateForm();

        const allTouched = {};
        Object.keys(formData).forEach(key => {
            if (key !== 'patientId') allTouched[key] = true;
        });
        setTouchedFields(allTouched);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setFormError('Please correct the form');
            return;
        }

        setLoading(true);
        setFormError('');

        try {
            await new Promise(res => setTimeout(res, 1000));
            const patientId = 'SIM-' + Math.floor(Math.random() * 1000000);

            localStorage.setItem('patientId', patientId);
            localStorage.setItem('userData', JSON.stringify({ ...formData, patientId, bmi, bmiCategory }));

            login(patientId);
            navigate('/home');
            console.log('Registration successful:', { ...formData, patientId, bmi, bmiCategory });
        } catch (err) {
            setFormError('Something went wrong.');
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
                        {/* Name */}
                        <div className="input-group">
                            <label htmlFor="name">Full Name*</label>
                            <input  id="name" name="name" type="text" placeholder="John Doe"
                                value={formData.name} onChange={handleChange} onBlur={handleBlur}
                                className={errors.name && touchedFields.name ? 'input-error' : ''}
                            />
                            {errors.name && touchedFields.name && (
                                <p className="field-error">{errors.name}</p>
                            )}
                        </div>

                        {/* Age */}
                        <div className="input-group">
                            <label htmlFor="age">Age*</label>
                            <input  id="age" name="age" type="number.age" placeholder="30"
                                value={formData.age} onChange={handleChange} onBlur={handleBlur}
                                className={errors.age && touchedFields.age ? 'input-error' : ''}
                            />
                            {errors.age && touchedFields.age && (
                                <p className="field-error">{errors.age}</p>
                            )}
                        </div>

                        {/* Gender */}
                        <div className="input-group">
                            <label htmlFor="gender">Gender*</label>
                            <select id="gender" name="gender" value={formData.gender}
                                onChange={handleChange} onBlur={handleBlur}
                                className={errors.gender && touchedFields.gender ? 'input-error' : ''}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && touchedFields.gender && (
                                <p className="field-error">{errors.gender}</p>
                            )}
                        </div>

                        {/* Weight */}
                        <div className="input-group">
                            <label htmlFor="weight">Weight (kg)*</label>
                            <input classname='reg-input' id="weight" name="weight" type="number" placeholder="70"
                                value={formData.weight} onChange={handleChange} onBlur={handleBlur}
                                className={errors.weight && touchedFields.weight ? 'input-error' : ''}
                            />
                            {errors.weight && touchedFields.weight && (
                                <p className="field-error">{errors.weight}</p>
                            )}
                        </div>

                        {/* Height */}
                        <div className="input-group">
                            <label htmlFor="height">Height (cm)*</label>
                            <input classname='reg-input' id="height" name="height" type="number" placeholder="170"
                                value={formData.height} onChange={handleChange} onBlur={handleBlur}
                                className={errors.height && touchedFields.height ? 'input-error' : ''}
                            />
                            {errors.height && touchedFields.height && (
                                <p className="field-error">{errors.height}</p>
                            )}
                        </div>

                        {/* Blood Group */}
                        <div className="input-group">
                            <label htmlFor="bloodGroup">Blood Group*</label>
                            <select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup}
                                onChange={handleChange} onBlur={handleBlur}
                                className={errors.bloodGroup && touchedFields.bloodGroup ? 'input-error' : ''}
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
                                <p className="field-error">{errors.bloodGroup}</p>
                            )}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="input-group full-width">
                        <label htmlFor="address">Address*</label>
                        <textarea id="address" name="address" rows="3"
                            placeholder="123 Main St, City, Country"
                            value={formData.address} onChange={handleChange} onBlur={handleBlur}
                            className={errors.address && touchedFields.address ? 'input-error' : ''}
                        ></textarea>
                        {errors.address && touchedFields.address && (
                            <p className="field-error">{errors.address}</p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className="input-group full-width">
                        <label htmlFor="phone">Phone Number*</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="9876543210"
                            value={formData.phone}
                            onChange={(e) => {
                                // Allow only digits
                                const val = e.target.value.replace(/\D/g, '');
                                setFormData(prev => ({ ...prev, phone: val }));
                            }}
                            onBlur={handleBlur}
                            className={errors.phone && touchedFields.phone ? 'input-error' : ''}
                            maxLength={10}
                        />

                        {errors.phone && touchedFields.phone && (
                            <p className="field-error">{errors.phone}</p>
                        )}
                    </div>

                    {/* Profile Image Upload */}
                    <div className="input-group full-width">
                        <label htmlFor="profileImage">Profile Image</label>
                        <input
                            id="profileImage"
                            name="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFormData(prev => ({
                                            ...prev,
                                            profileImage: reader.result
                                        }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        {formData.profileImage && (
                            <img
                                src={formData.profileImage}
                                alt="Preview"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    marginTop: '10px',
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                }}
                            />
                        )}
                    </div>

                    {/* BMI display */}
                    {bmi && (
                        <div className="bmi-result">
                            <h3>BMI Calculation</h3>
                            <div className="bmi-value">
                                <span>Your BMI: <strong>{bmi}</strong></span>
                                <span className={`bmi-category ${bmiCategory.toLowerCase().replace(' ', '-')}`}>
                                    {bmiCategory}
                                </span>
                            </div>
                        </div>
                    )}

                    <button type="submit" disabled={loading} className='register-button'>
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
