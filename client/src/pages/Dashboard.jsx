import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import URLShortener from '../components/URL/URLShortener';
import URLList from '../components/URL/URLList';
import Loading from '../components/Layout/Loading';
import useAuth from '../hooks/userAuth';

const Dashboard = () => {
  const [urlUpdateTrigger, setUrlUpdateTrigger] = useState(0);
  const { isAuthenticated, user, loading } = useAuth();

  console.log(user)
  const handleUrlAdded = () => {
    setUrlUpdateTrigger(prev => prev + 1);
  };

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-gray-900 text-white">
      <div className="container mx-auto h-full p-4">
        <div className="max-w-6xl mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-8 h-full">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-2 px-4 lg:p-8 h-full flex flex-col items-center justify-center">
                <div className="mb-6 text-center">
                  <h1 className="text-xl lg:text-3xl font-bold">
                    Welcome back, {user?.user.name || 'User'}!
                  </h1>
                  <p className="hidden lg:block mt-2 text-sm lg:text-base text-gray-400">
                    Manage your shortened URLs and track their performance.
                  </p>
                </div>
                <div className="w-full">
                  <URLShortener onUrlAdded={handleUrlAdded} />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 lg:p-8 h-full overflow-y-auto">
                <URLList onUrlAdded={urlUpdateTrigger} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;