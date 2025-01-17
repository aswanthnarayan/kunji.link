import { useState, useEffect } from 'react';
import { getUserUrls, deleteUrl } from '../../services/api';
import toast from 'react-hot-toast';

const URLList = ({ onUrlAdded }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchUrls();
  }, [onUrlAdded]);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserUrls();
      
      if (response.success) {
        setUrls(response.urls || []);
      } else {
        setError(response.message || 'Failed to fetch URLs');
        toast.error(response.message || 'Failed to fetch URLs');
      }
    } catch (err) {
      console.error('Error fetching URLs:', err);
      setError('Failed to fetch URLs. Please try again.');
      toast.error('Failed to fetch URLs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('URL copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy URL');
    }
  };

  const handleDelete = async (urlId) => {
    try {
      setDeletingId(urlId);
      const response = await deleteUrl(urlId);
      
      if (response.success) {
        toast.success('URL deleted successfully');
        fetchUrls(); // Refresh the list
      } else {
        toast.error(response.message || 'Failed to delete URL');
      }
    } catch (err) {
      console.error('Delete error:', err);
      const errorMessage = err.message || err.response?.data?.message || 'Failed to delete URL';
      toast.error(errorMessage);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopy = (text) => {
    copyToClipboard(text);
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserUrls();
      
      if (response.success) {
        setUrls(response.urls || []);
      } else {
        setError(response.message || 'Failed to fetch URLs');
        toast.error(response.message || 'Failed to fetch URLs');
      }
    } catch (err) {
      console.error('Error refreshing URLs:', err);
      setError('Failed to refresh URLs. Please try again.');
      toast.error('Failed to refresh URLs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Your URLs</h2>
        <button 
          onClick={handleRefresh}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          title="Refresh URLs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      ) : urls.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          No URLs found
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <div className="space-y-4">
            {urls.map((url) => (
              <div key={url.id} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-red-300">Original URL:</span>
                    <button
                      onClick={() => handleCopy(url.longUrl)}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="text-sm break-all">{url.longUrl}</div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-blue-300">Short URL:</span>
                    <button
                      onClick={() => handleCopy(url.shortUrl)}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="text-sm break-all">{url.shortUrl}</div>
                  
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                    <span>Clicks: {url.clicks}</span>
                    <span>{new Date(url.createdAt).toLocaleDateString()}</span>
                    <button
                      onClick={() => handleDelete(url.id)}
                      disabled={deletingId === url.id}
                      className="text-red-400 hover:text-red-300 transition-colors p-1 rounded disabled:opacity-50"
                    >
                      {deletingId === url.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default URLList;