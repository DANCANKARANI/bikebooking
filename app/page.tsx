// pages/index.js
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main>
        <section className="hero bg-cover bg-center text-white py-20" style={{ backgroundImage: "url('/hero-background.jpg')" }}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Adventure Awaits</h1>
            <p className="text-lg mb-6">Find the perfect bike for your next ride</p>
            <input 
              type="text" 
              placeholder="Search for bikes by location" 
              className="px-4 py-2 rounded w-full max-w-md mb-4 text-gray-800" 
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Find a Bike Near You</button>
          </div>
        </section>

        {/* Additional sections */}
      </main>
      <Footer />
    </div>
  );
}
