"use client";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";



const NotFoundPage = () => {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-16 px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-2xl font-semibold text-gray-600 mb-4">
            Oops! Page not found
          </p>
          <p className="text-lg text-gray-500 mb-8">
            Sorry, the page you&apos;re looking for does not exist or has been moved.
          </p>
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Go to Homepage
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
