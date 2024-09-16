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
  number_plate: string; // Added field for number plate
}

const BikesPage = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [selectedBikeId, setSelectedBikeId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/bikes/bookings/${bikeId}`, {
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
        // Calculate pickup and return times
        const currentTime = new Date();
        const pickupTime = currentTime.toLocaleString();
        const returnTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000).toLocaleString();

        setSuccessMessage(`Successfully booked bike with ID: ${bikeId}\n\nPickup Time: ${pickupTime}\nReturn Time: ${returnTime}`);
        setSelectedBikeId(bikeId);
        setShowPaymentModal(true);  // Show payment modal after booking
      } else {
        throw new Error(result.message || 'Booking failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while booking the bike');
    }
  };

  const handlePaymentOption = async (paymentOption: string) => {
    try {
      setError('');
      setSuccessMessage('');

      // Process the payment based on the selected payment option
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/bikes/bookings/${selectedBikeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ payment_option: paymentOption }),
      });

      if (!response.ok) {
        throw new Error('Failed to process payment');
      }

      const result = await response.json();

      if (result.success === "true") {
        setSuccessMessage(`Payment ${paymentOption} for bike with ID: ${selectedBikeId} processed successfully`);
        setShowPaymentModal(false);  // Hide payment modal after successful payment
      } else {
        throw new Error(result.message || 'Payment failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while processing payment');
    }
  };

  return (
    <div className="font-sans antialiased bg-gray-900 text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Available Bikes</h1>
        <h4 className="text-3xl font-bold mb-6 text-center text-white">The customer will cater for the bike's fuel consuption</h4>
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
      </main>
      <Footer />

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Choose Payment Option</h2>
            <p className="mb-4">How would you like to pay for your booking?</p>
            <div className="flex justify-between">
              <button
                onClick={() => handlePaymentOption('before')}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
              >
                Pay Before Ride
              </button>
              <button
                onClick={() => handlePaymentOption('after')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded ml-2"
              >
                Pay After Ride
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BikesPage;
