"use client";

import React, { useState } from 'react';

import LoginPage from './login/page';



interface Bike {
  id: string;
  name: string;
  location: string;
  price: number;
  image_url: string;
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
        throw new Error('Failed to fetch bikes');
      }

      if (result.success !== "true" || result.data.length === 0) {
        console.log(result.error);
        setError('No bikes found for this location');
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
        body: JSON.stringify({ book_id: bikeId }), // Sending book_id in the body
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
    <div className="font-sans antialiased">
      <LoginPage />
    </div>
  );
};

export default Home;
