import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../Css/UserHome.css";
import profile from "../../Images/profile.jpeg";

const HealthProfile = () => {
    const storedData = JSON.parse(localStorage.getItem("userData")) || {};
    const [profilePic, setProfilePic] = useState(storedData.profileImage || null);
    const [formData, setFormData] = useState({
        name: storedData.name || "N/A",
        age: storedData.age || "N/A",
        gender: storedData.gender || "N/A",
        phone: storedData.phone || "N/A",
        weight: storedData.weight || "N/A",
        height: storedData.height || "N/A",
        address: storedData.address || "N/A",
        bloodGroup: storedData.bloodGroup || "N/A",
    });
    const [bmi, setBmi] = useState(storedData.bmi || null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        validateField(name, value);

        if (name === "weight" || name === "height") {
            const weight = parseFloat(name === "weight" ? value : formData.weight);
            const height = parseFloat(name === "height" ? value : formData.height) / 100;

            if (weight > 0 && height > 0) {
                const calculatedBmi = (weight / (height * height)).toFixed(2);
                setBmi(calculatedBmi);
            } else {
                setBmi(null);
            }
        }
    };

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

        if (name === "phone" && (!/^\d{10}$/.test(value))) {
            newErrors.phone = "Phone number must be exactly 10 digits";
        } else {
            delete newErrors.phone;
        }

        setErrors(newErrors);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0 && profilePic) {
            const updatedUserData = {
                ...formData,
                profileImage: profilePic,
                bmi,
            };

            // Save to localStorage
            localStorage.setItem("userData", JSON.stringify(updatedUserData));

            // Notify other components
            window.dispatchEvent(new Event("userDataUpdated"));

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

                <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
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
                    <label htmlFor="phone">Phone Number*</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={handleChange}
                        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                        maxLength={10}
                    />
                    {errors.phone && <p className="error-text">{errors.phone}</p>}
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
