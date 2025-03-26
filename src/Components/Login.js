import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Css/Login.css';

function Login() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const navigate = useNavigate();

 const handleLogin = async (e) => {
 e.preventDefault();
 const res = await fetch('http://localhost:5000/api/login', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 credentials: 'include',
 body: JSON.stringify({ username, password })
 });
 const data = await res.json();
 if (res.ok) {
 localStorage.setItem('userId', data.userId);
 navigate('/');
 } else {
 setError(data.message);
 }
 };

 return (
 <div className="login-container main">
 <h1>Login</h1>
 <form onSubmit={handleLogin}>
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
 <button type="submit">Login</button>
 {error && <p className="error">{error}</p>}
 </form>
 <p>
 New user? <Link to="/register">Register here</Link>
 </p>
 </div>
 );
}

export default Login;