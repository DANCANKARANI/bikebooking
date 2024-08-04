"use client"

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const bikesData = [
  {
    id: 1,
    image: '/bike1.jpeg',
    location: 'New York, NY',
    costPerHour: '$15/hour',
  },
  {
    id: 2,
    image: '/bike2.jpeg',
    location: 'Los Angeles, CA',
    costPerHour: '$12/hour',
  },
  {
    id: 3,
    image: '/bike3.jpeg',
    location: 'San Francisco, CA',
    costPerHour: '$18/hour',
  },
  {
    id: 4,
    image: '/bike3.jpeg',
    location: 'Chicago, IL',
    costPerHour: '$14/hour',
  },
];

const BikesPage = () => {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Available Bikes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bikesData.map((bike) => (
            <div key={bike.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={bike.image}
                alt={`Bike in ${bike.location}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{bike.location}</h3>
                <p className="text-gray-600">{bike.costPerHour}</p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
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
