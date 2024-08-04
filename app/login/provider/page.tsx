"use client"

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

const ProviderLoginPage = () => {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Provider Login</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Login
            </button>
            <div className="mt-4 text-center">
              <a href="/forgot-password" className="text-green-500 hover:underline">Forgot Password?</a>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderLoginPage;
