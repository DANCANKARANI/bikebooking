"use client";
import { useRouter } from 'next/navigation';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const ProviderSignupPage = () => {
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission logic here
    // For example, send the form data to your API

    // Redirect to login or homepage upon successful signup
    router.push('/login/provider');
  };

  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Provider Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="business-name" className="block text-gray-700">Business Name</label>
              <input
                type="text"
                id="business-name"
                name="business-name"
                placeholder="Your Business Name"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contact-person" className="block text-gray-700">Contact Person</label>
              <input
                type="text"
                id="contact-person"
                name="contact-person"
                placeholder="John Doe"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
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
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
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
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirm-password" className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="********"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">Business Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your business"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Sign Up
            </button>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Already have an account? <a href="/login/provider" className="text-green-500 hover:underline">Login</a>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderSignupPage;
