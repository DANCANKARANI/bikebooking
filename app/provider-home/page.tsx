"use client";
import React, { useState } from 'react';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';

const ProviderPage = () => {
  const [cost, setCost] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fileName, setFileName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file); // Assuming setImage is the function to set the image file state
  
      // Create a URL for the selected image file to use as a preview
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl); // Assuming setImageUrl is the function to set the preview URL state
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('cost', cost);
    formData.append('location', location);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('https://tysonbikes.onrender.com/api/v1/bikes', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        
      });

      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }

      const result = await response.json();

      if (response.ok) {
        setSuccess('Bike details posted successfully!');
        // Clear form fields
        setCost('');
        setLocation('');
        setImage(null);
      } else {
        throw new Error(result.message || 'Failed to post bike details.');
      }
    } catch (error: any) {
      console.error('Error posting bike details:', error);
      setError(error.message || 'An unknown error occurred.');
    }
  };

  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Post Bike Details</h1>
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
              {fileName && (
                <p className="mt-2 text-sm text-gray-600">Selected file: {fileName}</p>
              )}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderPage;
