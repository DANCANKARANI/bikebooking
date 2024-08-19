"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const CustomerSignupPage = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {

      const response = await fetch('https://tysonbikes.onrender.com/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ 
          full_name: fullName,
          email,
          password,
          confirm_password: confirmPassword 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setError(result.error);
        setTimeout(() => {
          router.push('/login/customer');
        }, 2000); // Redirect after 2 seconds to allow the success message to be visible
      } else {
        throw new Error(result.message || 'Sign up failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Error during signup:', error);
      setError(error.message || 'An unknown error occurred.');
    }
  };

  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Customer Sign Up</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Sign Up
            </button>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Already have an account? <a href="/login/customer" className="text-blue-500 hover:underline">Login</a>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerSignupPage;
