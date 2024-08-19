"use client";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import "../globals.css";

const PrivacyPolicyPage = () => {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="mb-4">
              Welcome to tyson bike booking app. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Personal Information: Name, email address, phone number, etc.</li>
              <li>Payment Information: Credit card details, billing address, etc.</li>
              <li>Usage Data: Information about how you use our services, including log data and device information.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>To provide and maintain our services.</li>
              <li>To process transactions and manage bookings.</li>
              <li>To communicate with you, including sending service updates and promotional materials.</li>
              <li>To analyze usage trends and improve our services.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">How We Share Your Information</h2>
            <p className="mb-4">
              We do not sell or rent your personal information. We may share your information in the following situations:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>With service providers who assist us in operating our services.</li>
              <li>To comply with legal obligations or protect our rights.</li>
              <li>In connection with a business transaction, such as a merger or acquisition.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Your Choices</h2>
            <p className="mb-4">
              You have the following choices regarding your information:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Access, update, or delete your personal information.</li>
              <li>Opt out of receiving promotional communications.</li>
              <li>Request information about the data we hold about you.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Security</h2>
            <p className="mb-4">
              We implement security measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will notify you of significant changes.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p className="mb-4">
              Email: <a href="mailto:tysonbikes@gmail.com" className="text-blue-500 hover:underline">tysonbikes@gmail.com</a>
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

export default PrivacyPolicyPage;
