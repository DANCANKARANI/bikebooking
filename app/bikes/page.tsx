"use client";

import { useEffect, useState } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface Bike {
  id: string;
  image_url: string;
  location: string;
  price: number;
  owner: string;
}

const BikesPage = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch('https://tysonbikes.onrender.com/api/v1/bikes/all', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bikes');
        }

        const result = await response.json();
        if (result.success !== "true" || result.data.length === 0) {
          setError('No bikes available');
        } else {
          setBikes(result.data);
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching bikes');
      }
    };

    fetchBikes();
  }, []);

  const handleBookNow = async (bikeId: string) => {
    try {
      setError('');
      setSuccessMessage('');
      
      const response = await fetch(`https://tysonbikes.onrender.com/api/v1/bikes/bookings/${bikeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ book_id: bikeId }),
      });

      if (!response.ok) {
        throw new Error('Failed to book the bike');
      }

      const result = await response.json();
      if (result.success === "true") {
        setSuccessMessage(`Successfully booked bike with ID: ${bikeId}`);
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
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Available Bikes</h1>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-6">{successMessage}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bikes.map((bike) => (
            <div key={bike.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img
                src={bike.image_url}
                alt={`Bike in ${bike.location}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{bike.location}</h3>
                <p className="text-gray-400">ksh{bike.price}/hour</p>
                <p className="text-gray-400">Owner: {bike.owner}</p>
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
      </main>
      <Footer />
    </div>
  );
};

export default BikesPage;
