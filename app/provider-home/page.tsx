"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';

const ProviderPage = () => {
  const [cost, setCost] = useState('');
  const [location, setLocation] = useState('');
  const [number_plate, setNumberPlate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('cost', cost);
    formData.append('location', location);
    formData.append('number_plate', number_plate); // Add number_plate to formData
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/bikes`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }

      const result = await response.json();

      if (response.ok) {
        setSuccess('Bike details posted successfully!');
        setCost('');
        setLocation('');
        setNumberPlate(''); // Clear the number_plate field
        setImage(null);
        setImageUrl(null); // Clear the image preview
      } else {
        throw new Error(result.message || 'Failed to post bike details.');
      }
    } catch (error: any) {
      console.error('Error posting bike details:', error);
      setError(error.message || 'An unknown error occurred.');
    }
  };

  const handleGoToDashboard = () => {
    router.push('provider-home/dashboard');
  };

  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Post Your Bike Details
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="cost" className="block text-gray-700">Cost</label>
              <input
                type="number"
                id="cost"
                name="cost"
                placeholder="Enter cost"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter location"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="number_plate" className="block text-gray-700">Number Plate</label>
              <input
                type="text"
                id="number_plate"
                name="number_plate"
                placeholder="Enter Number Plate"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
                value={number_plate}
                onChange={(e) => setNumberPlate(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700">Image of the Bike</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                onChange={handleImageChange}
                required
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Selected"
                  className="mt-4 max-w-full h-auto rounded-md shadow-md"
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Post Details
            </button>
          </form>
          <button
            onClick={handleGoToDashboard}
            className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Go to Dashboard
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderPage;
