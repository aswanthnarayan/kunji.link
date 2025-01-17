import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import Loading from '../components/Layout/Loading';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token) {
        try {
          // Verify token hasn't expired
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
          } else {
            // Get current user data
            const response = await getCurrentUser();
            if (response.success) {
              const userData = response.user;
              localStorage.setItem('user', JSON.stringify(userData));
              setUser(userData);
              setIsAuthenticated(true);
            } else {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setUser(null);
              setIsAuthenticated(false);
            }
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      } else if (storedUser) {
        // If we have user data but no token, clean up
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  if (loading) {
    return <Loading/>
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
