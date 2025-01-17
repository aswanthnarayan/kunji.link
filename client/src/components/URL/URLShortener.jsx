import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/userAuth';
import { shortenUrl } from '../../services/api';
import Loading from '../Layout/Loading';

const URLShortener = ({ onUrlAdded }) => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await shortenUrl(url);
      if (response.success) {
        setShortUrl(response.shortUrl);
        setUrl('');
        if (onUrlAdded) {
          onUrlAdded();
        }
        toast.success('URL shortened successfully!');
      } else {
        toast.error(response.message || 'Failed to shorten URL');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success('URL copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy URL');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-full flex flex-col ">
      <h2 className="text-xl lg:text-3xl font-bold text-center mb-6">
        Shorten Your URL
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL here"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 bg-gray-700/50 rounded-lg p-4">
          <p className="text-gray-300 text-sm mb-2">Shortened URL:</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 min-w-0">
              <div className="relative">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg pr-20 text-sm sm:text-base"
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm whitespace-nowrap"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isAuthenticated && (
        <div className="mt-auto pt-4 text-center">
          <p className="text-sm text-gray-400 mb-2">Want to manage your shortened URLs?</p>
          <div className="space-x-4">
            <Link to="/login" className="text-sm text-blue-400 hover:text-blue-300">
              Login
            </Link>
            <Link to="/register" className="text-sm text-blue-400 hover:text-blue-300">
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLShortener;