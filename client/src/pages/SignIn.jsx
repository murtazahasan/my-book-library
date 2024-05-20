// src/pages/SignIn.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:4000/user/login', {
        email,
        password,
      });
      dispatch(signIn({ email }));
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Sign In</h2>
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
        onClick={handleSignIn}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign In
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <p className="mt-4">
        Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
