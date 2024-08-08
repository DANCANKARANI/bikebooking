
"use client"
import React, { useState } from 'react';
import Navbar from './components/Navbar';

interface Bike {
  id: number; // Adjust according to your data model
  name: string;
  location: string;
  cost_per_hour: number;
  image_url: string;
}

const Home = () => {
  const [location, setLocation] = useState<string>('');
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    setError('');
    setBikes([]);

    try {
      const token = localStorage.getItem('authToken');
     
      const response = await fetch(`https://bikebooking-api.onrender.com/api/v1/bikes/?location=${encodeURIComponent(location)}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
       
      if (!response.ok) {
        throw new Error('Failed to fetch bikes'+location);
      }
      
      const result: Bike[] = await response.json();
      console.log(result)
      
      if (result.length === 0) {
        setError('No bikes found for this location');
      } else {
        setBikes(result);
      }
    } catch (err) {
      setError("error:"+err);
    }
  };

  return (
    <div className="font-sans antialiased">
        <Navbar/>
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-3xl">Bike Finder</h1>
      </header>
    

      <main className="p-4">
        <section className="hero bg-cover bg-center text-white py-20" style={{ backgroundImage: "url('/hero-background.jpg')" }}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Adventure Awaits</h1>
            <p className="text-lg mb-6">Find the perfect bike for your next ride</p>
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

        {bikes.length > 0 && (
          <ul className="list-none mt-4">
            {bikes.map((bike) => (
              <li key={bike.id} className="border-b border-gray-300 py-4">
                <h2 className="text-xl font-bold">{bike.name}</h2>
                <p>{bike.location}</p>
                <p>${bike.cost_per_hour} per hour</p>
                <img src={bike.image_url} alt={bike.name} className="w-full max-w-xs mt-2" />
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Bike Finder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
