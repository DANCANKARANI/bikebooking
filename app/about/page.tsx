"use client";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from 'next/image';


const AboutUsPage = () => {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
          <section className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">
              At Tyson Bike Booking App, our mission is to make biking accessible and enjoyable for everyone. We strive to connect bike enthusiasts with a wide range of bikes for every type of adventure, whether it’s a leisurely ride or a thrilling mountain trail.
            </p>
            <p className="mb-4">
              We believe in promoting a healthier lifestyle and reducing our carbon footprint by encouraging the use of bikes as a primary mode of transportation. Our platform is designed to provide a seamless and user-friendly experience for both bike providers and customers.
            </p>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
            <p className="mb-4">
              Founded in 2023, Bike Booking App was created by a team of passionate cyclists and technology enthusiasts. We saw an opportunity to bring together bike lovers and providers in a way that simplifies the booking process and enhances the overall experience.
            </p>
            <p className="mb-4">
              Our journey began with a vision to revolutionize the way people find and rent bikes. Since our launch, we’ve been dedicated to continuously improving our platform and expanding our network to offer the best selection of bikes to our users.
            </p>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-100 p-6 rounded-lg text-center">
              <Image src="/member-1.jpg" alt="Team Member 1" width={128} height={128} className="mx-auto mb-4 rounded-full object-cover" />                <h3 className="text-xl font-semibold mb-2">Tyson Mwenda</h3>
                <p className="text-gray-600">Co-Founder & CEO</p>
                <p className="mt-2">Tyson is a seasoned cyclist and tech visionary, driving the innovation and growth of Bike Booking App.</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg text-center">
                <Image src="/member-3.jpg" alt="Team Member 2" className="w-32 h-32 mx-auto mb-4 rounded-full object-cover" />
                <h3 className="text-xl font-semibold mb-2">Brian Yobra</h3>
                <p className="text-gray-600">Co-Founder & CTO</p>
                <p className="mt-2">Brian oversees the technical development and ensures the platform&#39;s smooth operation and scalability.</p>              </div>
              <div className="bg-gray-100 p-6 rounded-lg text-center">
                <Image src="/member-3.jpeg" alt="Team Member 3" className="w-32 h-32 mx-auto mb-4 rounded-full object-cover" />
                <h3 className="text-xl font-semibold mb-2">Clinton Mungai</h3>
                <p className="text-gray-600">Head of Customer Success</p>
                <p className="mt-2">Clinton is dedicated to ensuring our users have an exceptional experience and resolves any customer inquiries or issues.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
