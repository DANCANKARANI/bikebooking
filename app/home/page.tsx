"use client";

import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

interface Bike {
  owner: string;
  id: string;
  name: string;
  location: string;
  price: number;
  image_url: string;
  number_plate: string; // Added field for number plate
}

const Home = () => {
  const [location, setLocation] = useState<string>('');
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSearch = async () => {
    setError('');
    setSuccess('');
    setBikes([]);

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/bikes/?location=${encodeURIComponent(location)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        throw new Error(result || 'Failed to fetch bikes');
      }

      if (result.success !== "true" || result.data.length === 0) {
        console.log(result.error);
        setError(result.error || 'No bikes found for this location');
      } else {
        setSuccess(result.message);
        setBikes(result.data);
        console.log(result.data);
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    }
  };

  const handleBookNow = async (bikeId: string) => {
    try {
      setError('');
      setSuccess('');
      
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://tysonbikes.onrender.com/api/v1/bikes/bookings/${bikeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ book_id: bikeId }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to book the bike');
      }

      const result = await response.json();
      if (result.success === "true") {
        setSuccess(`Successfully booked bike with ID: ${bikeId}`);
      } else {
        throw new Error(result.message || 'Booking failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while booking the bike');
    }
  };

  return (
    <div className="font-sans antialiased bg-gray-900 text-white">
      <Navbar />
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-3xl">Bike Finder</h1>
      </header>

      <main className="container mx-auto px-4 py-8" >
        <section className="hero bg-cover bg-center text-white py-20">
          <div className="container mx-auto px-4 text-center" style={{ backgroundImage: 'url("/bike1.jpeg")' }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-500">Your Adventure Awaits</h1>
            <p className="text-lg mb-6 text-blue-500">Find the perfect bike for your next ride</p>
            <input
              type="text"
              placeholder="Search for bikes by location"
              className="px-4 py-2 rounded w-full max-w-md mb-4 text-gray-800"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Find a Bike Near You
            </button>
          </div>
        </section>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && !error && <p className="text-green-500 text-center mt-4">{success}</p>}

        {bikes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {bikes.map((bike) => (
              <div key={bike.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={bike.image_url}
                  alt={`Bike in ${bike.location}`}
                  className="w-full h-48 object-cover"
                />
                <div className="bg-gray-800 p-4 text-white">
                  <h3 className="text-xl font-bold">{bike.location}</h3>
                  <p className="text-gray-400">ksh{bike.price} per hour</p>
                  <p className="text-gray-400">Owner: {bike.owner}</p>
                  <p className="text-gray-400">Number Plate: {bike.number_plate}</p> {/* Displaying number plate */}
                  <button
                    onClick={() => handleBookNow(bike.id)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
