"use client";
import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [reset_code, setResetCode] = useState('');
    const [password, setNewPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [showReset, setShowReset] = useState(false);

    // Handle forgot password submission
    const handleForgotPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/user/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, phone_number }),
            });

            const data = await response.json();
            console.log(data); // Log response to debug

            if (response.ok) {
                setSuccess(data.message); // Set success message
                setShowReset(true); // Show the reset password section
            } else {
                // Handle backend error response
                const errorMessage = Array.isArray(data.error) ? data.error.join(', ') : (data.error || 'An error occurred.');
                setError(errorMessage);
            }
        } catch (err) {
            setError('An error occurred while submitting the request.'); // Catch unexpected errors
        }
    };

    // Handle reset password submission
    // Handle reset password submission
// Handle reset password submission
const handleResetPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);

  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/user/reset-password`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email,              // Make sure this is sent as part of the reset
              phone_number,       // Include phone number if required
              reset_code,         // This is the reset code sent via email/phone
              password,  // The actual new password field
          }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.success === 'true') {
          setSuccess(data.message);  // Display success message
          // Redirect to login page after a delay of 2 seconds
          setTimeout(() => {
              window.location.href = '/login'; // Replace with your actual login page URL
          }, 2000);
      } else {
          const errorMessage = Array.isArray(data.error) ? data.error.join(', ') : (data.error || 'An error occurred.');
          setError(errorMessage);
      }
  } catch (err) {
      setError('An error occurred while resetting the password.');
  }
};


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                
                {/* Display error or success message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                {/* Form to submit forgot password request */}
                <form onSubmit={handleForgotPasswordSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-black">Phone Number:</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>

                {/* Show the reset password form only if the user has requested a password reset */}
                {showReset && (
                    <form onSubmit={handleResetPasswordSubmit} className="mt-6">
                        <div className="mb-4">
                            <label htmlFor="resetCode" className="block text-gray-700">Reset Code:</label>
                            <input
                                type="text"
                                id="resetCode"
                                value={reset_code}
                                onChange={(e) => setResetCode(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-gray-700">New Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={password}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
