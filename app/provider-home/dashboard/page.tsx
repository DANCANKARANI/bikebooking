"use client";
import { useEffect, useState } from 'react';

interface Bike {
  id: string;
  image_url: string;
  location: string;
  price: number;
  owner: string;
}

interface Provider {
  full_name: string;
}

const ProviderDashboard = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [userName, setUserName] = useState<string>(''); // State for storing user's full name

  // Fetch the bikes associated with the provider
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/provider/bikes`, {
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

  // Fetch the user's full name
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/provider`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }

        const result = await response.json();
        if (result.success === "true") {
          setUserName(result.data.full_name);
        } else {
          setError('Failed to fetch user name');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching user information');
      }
    };

    fetchUserName();
  }, []);

  // Handle bike deletion
  const handleDeleteBike = async (bikeId: string) => {
    try {
      setError('');
      setSuccessMessage('');

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/bikes/${bikeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the bike');
      }

      const result = await response.json();
      if (result.success === "true") {
        setSuccessMessage('Bike deleted successfully');
        // Remove the deleted bike from the state
        setBikes(bikes.filter(bike => bike.id !== bikeId));
      } else {
        throw new Error(result.message || 'Deletion failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting the bike');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Provider Dashboard</h1>
      <h2 className="text-xl font-semibold text-center mb-4">Welcome, {userName}</h2> {/* Display user's full name */}
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}
      {successMessage && <p className="text-green-500 text-center mb-6">{successMessage}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {bikes.map((bike) => (
          <div key={bike.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
              src={bike.image_url}
              alt={`Bike in ${bike.location}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{bike.location}</h3>
              <p className="text-gray-600 mb-1">ksh{bike.price}/hour</p>
              <p className="text-gray-600 mb-4">Owner: {bike.owner}</p>
              <button
                onClick={() => handleDeleteBike(bike.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderDashboard;
