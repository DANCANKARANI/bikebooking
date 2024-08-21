"use client";
import { useRouter } from 'next/navigation';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const router = useRouter();

  const handleRoleSelection = (role: string) => {
    router.push(`/login/${role}`);
  };

  const handleSignUpRedirect = (role: string) => {
    router.push(`/signup/${role}`);
  };

  return (
    <div className="font-sans antialiased">
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <p className="text-lg mb-8 text-center">Please select your role:</p>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleRoleSelection('provider')}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Login as Bike Provider
            </button>
            <button
              onClick={() => handleRoleSelection('customer')}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Login as Customer
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <a
                href="#"
                onClick={() => handleSignUpRedirect('provider')}
                className="text-green-500 hover:underline"
              >
                Sign Up as Provider
              </a>{' '}
              or{' '}
              <a
                href="#"
                onClick={() => handleSignUpRedirect('customer')}
                className="text-blue-500 hover:underline"
              >
                Sign Up as Customer
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
