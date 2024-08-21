"use client"
import React, { useState } from 'react';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';

const CustomerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('https://tysonbikes.onrender.com/api/v1/user/login', {
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
          // Save token to local storage (or handle it as needed)
          localStorage.setItem('authToken', result.data.token);
          // Redirect to home page
          window.location.href = '/home';
        } else {
          throw new Error(result.message || 'Login failed. Please check your email and password.');
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
          <h1 className="text-3xl font-bold mb-6 text-center text-black"> {/* Setting text color here */}
            Customer Login
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-black"> {/* Ensuring text color is black */}
                Email
              </label>
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
              <label htmlFor="password" className="block text-black"> {/* Ensuring text color is black */}
                Password
              </label>
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
            <div className="mt-4 text-center">
              <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLoginPage;
