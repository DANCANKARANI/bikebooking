"use client";
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear user authentication token
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Example for clearing a cookie

    // Optionally, you might want to make an API call to log the user out from the server
    // await fetch('/api/logout', { method: 'POST' });

    // Redirect the user to the login page or home page
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Tyson Bike Hiring</div>
        <div>Welcome To TysonBikes</div>
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/home" className="hover:text-gray-300">Home</Link>
          <Link href="/bikes" className="hover:text-gray-300">Bikes</Link>
          <Link href="/pricing" className="hover:text-gray-300">Pricing</Link>
          <button 
            onClick={handleLogout} 
            className="hover:text-gray-300"
          >
            Logout
          </button>
        </nav>
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-300 hover:border-gray-300"
          onClick={toggleMenu}
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 5h20v2H0V8zm0 5h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-700`}>
        <nav className="px-2 pt-2 pb-4 space-y-1">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-gray-600">Home</Link>
          <Link href="/bikes" className="block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-gray-600">Bikes</Link>
          <Link href="/pricing" className="block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-gray-600">Pricing</Link>
          <button 
            onClick={handleLogout} 
            className="block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-gray-600 w-full text-left"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
