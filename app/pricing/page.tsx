// pages/pricing.js

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const pricingData = [
  {
    id: 1,
    name: 'Basic Plan',
    price: '$10/hour',
    features: ['1 Bike', 'Helmet Included', 'City Rides'],
  },
  {
    id: 2,
    name: 'Pro Plan',
    price: '$25/day',
    features: ['3 Bikes', 'Helmet & Lock', 'City & Off-road'],
  },
  {
    id: 3,
    name: 'Premium Plan',
    price: '$50/day',
    features: ['Unlimited Bikes', 'Helmet, Lock & Insurance', 'All Terrain'],
  },
];

const PricingPage = () => {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Pricing Plans</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pricingData.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-800 text-2xl font-bold mb-4">{plan.price}</p>
                <ul className="text-gray-600 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0l-3.182-3.182a1 1 0 111.414-1.414L9.05 12.95l6.657-6.657a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full">
                  Choose Plan
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

export default PricingPage;
