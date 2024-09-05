"use client";

import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import "../globals.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [success, setSuccess] = useState<string>(''); // For success messages
  const [error, setError] = useState<string>(''); // For error messages

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess('');
    setError('');
  
    try {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/user/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the Authorization header
        },
        body: JSON.stringify(formData),
      });
  
      const textResponse = await response.text(); // Get the raw text response
      console.log('Response Text:', textResponse);
  
      try {
        const result = JSON.parse(textResponse); // Try to parse the JSON response
        if (response.ok) {
          setSuccess('Your message has been sent successfully!');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        } else {
          throw new Error(result.message || 'Failed to send message');
        }
      } catch (jsonError) {
        // Handle case where response is not valid JSON
        setSuccess(textResponse);
      }
    } catch (error: any) {
      setError(error.message || 'An unknown error occurred.');
    }
  };

  return (
    <div className="font-sans antialiased text-black"> {/* Ensuring text color is black */}
      <Navbar />
      <main className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
          <section className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-semibold mb-4 text-center">Get in Touch</h2>
            <p className="text-lg mb-8 text-center">
              Have questions, feedback, or need support? Fill out the form below, and we&apos;ll get back to you as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Send Message
                </button>
              </div>
            </form>
            {success && <p className="text-green-500 text-center mt-4">{success}</p>}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </section>

          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-4 text-center">Contact Information</h2>
            <p className="text-lg mb-4 text-center">
              You can also reach us through the following contact details:
            </p>
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                <strong>Email:</strong> <a href="mailto:support@bikebookingapp.com" className="text-blue-500 hover:underline">tysonbikes@gmail.com</a>
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Phone:</strong> +(254) 715-118-565
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong> 458 CUEA Lane, Eldoret City, BC 12345
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
