// src/pages/SignUp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await axios.post('http://localhost:4000/user/signup', {
        email,
        password,
        username,
      });
      navigate('/signin');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handleSignUp}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign Up
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <p className="mt-4">
        Already have an account? <Link to="/signin" className="text-blue-500">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
