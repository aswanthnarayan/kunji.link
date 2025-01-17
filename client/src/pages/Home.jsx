import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import URLShortener from '../components/URL/URLShortener';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto p-4 pb-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 justify-center items-center">
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-800 rounded-xl shadow-lg">
              <div className="p-4 lg:p-8">
                <div className="mb-6">
                  <h1 className="text-xl lg:text-3xl font-bold text-center">
                    Welcome to Kunji.link!
                  </h1>
                  <p className="mt-2 text-gray-400 text-center">
                    Create short, memorable links in seconds.
                  </p>
                </div>
                <URLShortener />
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="text-blue-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">Lightning Fast</h3>
                <p className="mt-2 text-gray-400">
                  Create short links instantly with our optimized infrastructure.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="text-blue-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">Secure & Reliable</h3>
                <p className="mt-2 text-gray-400">
                  Your links are safe with us. We ensure high availability and security.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="text-blue-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">Analytics</h3>
                <p className="mt-2 text-gray-400">
                  Track your link performance with detailed click analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;