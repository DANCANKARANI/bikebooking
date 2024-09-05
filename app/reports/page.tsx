"use client";
import { useEffect, useState } from 'react';

interface User {
  id: string;
  full_name: string;
  email: string;
}

interface Bike {
  id: string;
  location: string;
  price: number;
  vat: number;
  total: number;
  image_url: string;
}

const Reports = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [error, setError] = useState<string>('');

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/user/all`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const result = await response.json();
        if (result.success === "true") {
          setUsers(result.data);
        } else {
          setError('No users found');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching users');
      }
    };

    fetchUsers();
  }, []);

  // Fetch all bikes
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/bikes/all`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bikes');
        }

        const result = await response.json();
        if (result.success === "true") {
          setBikes(result.data);
        } else {
          setError('No bikes found');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching bikes');
      }
    };

    fetchBikes();
  }, []);

  // Handle print button click
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Reports</h1>
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}
      
      <div className="flex justify-end mb-4">
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Print
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Users Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          {users.length > 0 ? (
            <table className="min-w-full bg-gray-100">
              <thead>
                <tr>
                  <th className="py-2 px-4 border text-black">Full Name</th>
                  <th className="py-2 px-4 border text-black">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border text-black">{user.full_name}</td>
                    <td className="py-2 px-4 border text-black">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users found</p>
          )}
        </div>

        {/* Bikes Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Bikes</h2>
          {bikes.length > 0 ? (
            <table className="min-w-full bg-gray-100">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Location</th>
                  <th className="py-2 px-4 border">Price</th>
                  <th className="py-2 px-4 border">VAT</th>
                  <th className="py-2 px-4 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {bikes.map(bike => (
                  <tr key={bike.id}>
                    <td className="py-2 px-4 border">{bike.location}</td>
                    <td className="py-2 px-4 border">{bike.price}</td>
                    <td className="py-2 px-4 border">{bike.vat}</td>
                    <td className="py-2 px-4 border">{bike.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No bikes found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
