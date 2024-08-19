"use client";
import "../globals.css";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const TermsOfServicePage = () => {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center ext-black">Terms of Service</h1>
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-black">Introduction</h2>
            <p className="mb-4">
              Welcome to our bike booking app. By accessing or using our services, you agree to comply with and be bound by the following terms and conditions. If you do not agree with these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="mb-4">
              By using our services, you agree to these Terms of Service and our Privacy Policy. We may update these terms from time to time, and your continued use of our services constitutes acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-semibold mb-4 ext-black">User Responsibilities</h2>
            <p className="mb-4">
              As a user, you agree to:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Provide accurate and complete information when using our services.</li>
              <li>Keep your account information confidential and notify us of any unauthorized use.</li>
              <li>Use our services in compliance with applicable laws and regulations.</li>
              <li>Not engage in any activities that may harm or disrupt our services or the experience of other users.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Bookings and Payments</h2>
            <p className="mb-4">
              All bookings made through our app are subject to availability. Payment for bookings must be made through the designated payment methods. We reserve the right to modify our pricing and payment policies at any time.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Cancellation and Refunds</h2>
            <p className="mb-4">
              Cancellation policies vary depending on the type of booking. Please refer to our cancellation policy for specific details. Refunds will be processed according to the terms outlined in the cancellation policy.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Limitations of Liability</h2>
            <p className="mb-4">
              We are not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services. Our liability is limited to the maximum extent permitted by law.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="mb-4">
              All content and materials on our app, including text, graphics, logos, and images, are owned by us or our licensors and are protected by intellectual property laws. You may not use, reproduce, or distribute any content without our prior written consent.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <p className="mb-4">
              We reserve the right to terminate or suspend your access to our services if you violate these terms or engage in activities that may harm our services or other users.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p className="mb-4">
              These Terms of Service are governed by and construed in accordance with the laws of Kenya. Any disputes arising from these terms or your use of our services will be subject to the exclusive jurisdiction of the courts in Kenya.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions or concerns about these Terms of Service, please contact us at:
            </p>
            <p className="mb-4">
              Email: <a href="mailto:support@bikebookingapp.com" className="text-blue-500 hover:underline">tysonbikes@gmail.com</a>
            </p>
            <p>
              Address: 458 CUEA Lane, Eldoret City, BC 12345
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
