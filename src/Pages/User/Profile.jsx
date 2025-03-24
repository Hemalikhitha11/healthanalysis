import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../Css/UserHome.css";
import profile from "../../Images/profile.jpeg";

const HealthProfile = () => {
    const [profilePic, setProfilePic] = useState(profile);
    const [formData, setFormData] = useState({
        name: "Kakashi Hatake",
        age: "24",
        gender: "Male",
        weight: "29",
        height: "155",
        address: "kohna",
        bloodGroup: "O+",
    });
    const [bmi, setBmi] = useState(12.07);
    const [errors, setErrors] = useState({});

    // Handle input change with validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        validateField(name, value);

        // BMI Calculation
        if (name === "weight" || name === "height") {
            const weight = parseFloat(name === "weight" ? value : formData.weight);
            const height = parseFloat(name === "height" ? value : formData.height) / 100; // Convert cm to meters

            if (weight > 0 && height > 0) {
                const calculatedBmi = (weight / (height * height)).toFixed(2);
                setBmi(calculatedBmi);
            } else {
                setBmi(null);
            }
        }
    };

    // Validation function
    const validateField = (name, value) => {
        let newErrors = { ...errors };

        if (name === "name" && (value.length < 3 || !/^[a-zA-Z\s]+$/.test(value))) {
            newErrors.name = "Name must be at least 3 letters";
        } else {
            delete newErrors.name;
        }

        if (name === "age" && (!/^\d+$/.test(value) || value < 10 || value > 100)) {
            newErrors.age = "Enter a valid age (10-100)";
        } else {
            delete newErrors.age;
        }

        if (name === "gender" && !["Male", "Female", "Other"].includes(value)) {
            newErrors.gender = "Select your gender";
        } else {
            delete newErrors.gender;
        }

        if (name === "weight" && (!/^\d+$/.test(value) || value < 20 || value > 300)) {
            newErrors.weight = "Enter a valid weight (20-300 kg)";
        } else {
            delete newErrors.weight;
        }

        if (name === "height" && (!/^\d+$/.test(value) || value < 50 || value > 250)) {
            newErrors.height = "Enter a valid height (50-250 cm)";
        } else {
            delete newErrors.height;
        }

        if (name === "bloodGroup" && !/^(A|B|AB|O)[+-]$/.test(value.toUpperCase())) {
            newErrors.bloodGroup = "Enter a valid blood group (e.g., A+, O-)";
        } else {
            delete newErrors.bloodGroup;
        }

        if (name === "address" && value.length < 10) {
            newErrors.address = "Address must be at least 10 characters";
        } else {
            delete newErrors.address;
        }

        setErrors(newErrors);
    };

    // Handle profile picture upload
    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0 && profilePic) {
            alert("Profile saved successfully!");
        } else {
            alert("Please fill the form correctly!");
        }
    };

    return (
        <motion.div 
            className="health-profile-container main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } }}
        >
            <h1 className="page-title">Health Profile</h1>

            {/* Profile Picture */}
            <div className="profile-pic">
                <label htmlFor="profile-upload">
                    <img 
                        src={profilePic || "https://via.placeholder.com/120"} 
                        alt="Profile" 
                        className="profile-img" 
                    />
                </label>
                <input 
                    type="file" 
                    id="profile-upload" 
                    accept="image/*" 
                    onChange={handleProfilePicChange} 
                    hidden 
                />
                <p className="upload-text">Click to upload</p>
                {!profilePic && <p className="error-text">Profile picture is required</p>}
            </div>

            {/* Form */}
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Enter your name" 
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label>Age</label>
                    <input 
                        type="text" 
                        name="age" 
                        value={formData.age} 
                        onChange={handleChange} 
                        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')} 
                        placeholder="Enter your age" 
                    />
                    {errors.age && <p className="error-text">{errors.age}</p>}
                </div>

                {/* Gender Dropdown */}
                <div className="form-group">
                    <label>Gender</label>
                    <select 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="error-text">{errors.gender}</p>}
                </div>

                <div className="form-group">
                    <label>Weight (kg)</label>
                    <input 
                        type="text" 
                        name="weight" 
                        value={formData.weight} 
                        onChange={handleChange} 
                        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')} 
                        placeholder="Enter your weight" 
                    />
                    {errors.weight && <p className="error-text">{errors.weight}</p>}
                </div>

                <div className="form-group">
                    <label>Height (cm)</label>
                    <input 
                        type="text" 
                        name="height" 
                        value={formData.height} 
                        onChange={handleChange} 
                        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')} 
                        placeholder="Enter your height" 
                    />
                    {errors.height && <p className="error-text">{errors.height}</p>}
                </div>

                <div className="form-group">
                    <label>Blood Group</label>
                    <input 
                        type="text" 
                        name="bloodGroup" 
                        value={formData.bloodGroup} 
                        onChange={handleChange} 
                        placeholder="Enter your blood group (e.g., A+)" 
                    />
                    {errors.bloodGroup && <p className="error-text">{errors.bloodGroup}</p>}
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <textarea 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        placeholder="Enter your address" 
                    />
                    {errors.address && <p className="error-text">{errors.address}</p>}
                </div>

                {/* BMI Display */}
                <div className="bmi-display">
                    <h3>Your BMI: {bmi || "N/A"}</h3>
                </div>

                <div className="button-group">
                    <button type="submit" className="save-btn">Save</button>
                </div>
            </form>
        </motion.div>
    );
};

export default HealthProfile;
