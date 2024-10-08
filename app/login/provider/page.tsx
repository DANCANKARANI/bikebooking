"use client";
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React, { useState } from 'react';

const ProviderLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    console.log(token);
  
    // Basic email validation: check for '@' and at least one '.' after the '@'
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/provider/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        if (result.success === 'true') {
          console.log('Login successful:', result);
          // Save token to state and local storage
          setToken(result.data.token);
          localStorage.setItem('authToken', result.data.token);
  
          // Redirect to home page or provider dashboard
          window.location.href = '/provider-home'; // Adjust as needed
          console.log(token);
        } else {
          throw new Error(result.error || 'Login failed. Please check your email and password.');
        }
      } else {
        // Handle non-200 response
        throw new Error(result.error.join(', ') || 'An error occurred.');
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      setError(error.message || 'An unknown error occurred.');
    }
  };
  

  return (
    <div className="font-sans antialiased text-black"> {/* Ensuring text color is black */}
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-black">Provider Login</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-black">Email</label> {/* Ensuring text color is black */}
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-black" // Ensure text color inside the input is black
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-black">Password</label> {/* Ensuring text color is black */}
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-black" // Ensure text color inside the input is black
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderLoginPage;
