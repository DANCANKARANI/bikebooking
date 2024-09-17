"use client"
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const ProviderSignupPage = () => {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main className="container mx-auto px-4 py-8" style={{
          backgroundImage: 'url("/bike1.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <h1 className="text-3xl font-bold mb-6">Bike Provider Registration</h1>
        {/* Registration form for bike providers */}
        <form className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" className="mt-1 block w-full px-4 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full px-4 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" className="mt-1 block w-full px-4 py-2 border rounded-md" />
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Register
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderSignupPage;
