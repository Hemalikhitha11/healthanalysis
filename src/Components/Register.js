import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Css/Register.css';

function Register() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const navigate = useNavigate();

 const handleRegister = async (e) => {
 e.preventDefault();
 const res = await fetch('http://localhost:5000/api/register', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ username, password })
 });
 const data = await res.json();
 if (res.ok) {
 alert('Registration successful! Please login.');
 navigate('/login');
 } else {
 setError(data.message);
 }
 };

 return (
 <div className="register-container main">
 <h1>Register</h1>
 <form onSubmit={handleRegister}>
 <input
 type="text"
 placeholder="Username"
 value={username}
 onChange={(e) => setUsername(e.target.value)}
 />
 <input
 type="password"
 placeholder="Password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 />
 <button type="submit">Register</button>
 {error && <p className="error">{error}</p>}
 </form>
 <p>
 Already have an account? <Link to="/login">Login here</Link>
 </p>
 </div>
 );
}

export default Register;