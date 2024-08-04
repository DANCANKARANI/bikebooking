// pages/index.js
import Image from 'next/image';
import Link from 'next/link';

export default function Home1() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="logo">Bike Booking</div>
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/bikes">Bikes</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/login">Login/Sign Up</Link>
            <button className="cta-button">Book Now</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h1>Your Adventure Awaits</h1>
            <p>Find the perfect bike for your next ride</p>
            <input type="text" placeholder="Search for bikes by location" className="search-bar" />
            <button className="cta-button">Find a Bike Near You</button>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h2>Features</h2>
            <div className="feature-list">
              <div className="feature-item">
                <i className="icon">🚴</i>
                <h3>Wide Selection of Bikes</h3>
                <p>Choose from a variety of bikes to suit your needs.</p>
              </div>
              <div className="feature-item">
                <i className="icon">💲</i>
                <h3>Affordable Rentals</h3>
                <p>Enjoy competitive pricing on all bike rentals.</p>
              </div>
              <div className="feature-item">
                <i className="icon">🕒</i>
                <h3>24/7 Support</h3>
                <p>We're here to help whenever you need us.</p>
              </div>
              <div className="feature-item">
                <i className="icon">📱</i>
                <h3>Easy Booking Process</h3>
                <p>Book your ride in just a few clicks.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="popular-bikes">
          <div className="container">
            <h2>Popular Bikes</h2>
            <div className="bike-list">
              <div className="bike-item">
                <Image src="/bike1.jpg" alt="Bike 1" width={150} height={100} />
                <h3>Mountain Bike</h3>
                <p>Great for off-road adventures.</p>
              </div>
              <div className="bike-item">
                <Image src="/bike2.jpg" alt="Bike 2" width={150} height={100} />
                <h3>City Bike</h3>
                <p>Perfect for urban commuting.</p>
              </div>
              <div className="bike-item">
                <Image src="/bike3.jpg" alt="Bike 3" width={150} height={100} />
                <h3>Electric Bike</h3>
                <p>Ride with ease and comfort.</p>
              </div>
            </div>
            <button className="cta-button">View All Bikes</button>
          </div>
        </section>

        <section className="how-it-works">
          <div className="container">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <i className="icon">🔍</i>
                <h3>Search for a Bike</h3>
                <p>Find the bike that suits your needs.</p>
              </div>
              <div className="step">
                <i className="icon">⚡</i>
                <h3>Book Instantly</h3>
                <p>Reserve your bike with just a few clicks.</p>
              </div>
              <div className="step">
                <i className="icon">🚴‍♂️</i>
                <h3>Enjoy Your Ride</h3>
                <p>Pick up your bike and start your adventure.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="container">
            <h2>Testimonials</h2>
            <div className="testimonial-list">
              <div className="testimonial-item">
                <p>"Great service and easy booking!"</p>
                <p>- John Doe</p>
                <div className="rating">★★★★★</div>
              </div>
              <div className="testimonial-item">
                <p>"Loved the variety of bikes available."</p>
                <p>- Jane Smith</p>
                <div className="rating">★★★★★</div>
              </div>
            </div>
          </div>
        </section>

        <section className="download-app">
          <div className="container">
            <h2>Download Our App</h2>
            <p>Get the best experience on mobile.</p>
            <div className="app-buttons">
              <a href="#" className="app-store-button">App Store</a>
              <a href="#" className="google-play-button">Google Play</a>
            </div>
            <Image src="/app-preview.jpg" alt="App Preview" width={300} height={150} />
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-info">
            <p>Contact us: email@example.com | Phone: +123456789</p>
            <p>
              <Link href="/privacy-policy">Privacy Policy</Link> |{' '}
              <Link href="/terms-of-service">Terms of Service</Link>
            </p>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
