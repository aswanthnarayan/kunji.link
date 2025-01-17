import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// token generation
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth - Apis calls
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during registration' };
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during login' };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching current user' };
  }
};

// URL - API calls
export const shortenUrl = async (longUrl) => {
  try {
    const response = await api.post('/url/shorten', { longUrl });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error shortening URL' };
  }
};

export const getUserUrls = async () => {
  try {
    const response = await api.get('/url/user');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching user URLs' };
  }
};

export const deleteUrl = async (urlId) => {
  if (!urlId) {
    throw { success: false, message: 'URL ID is required' };
  }

  try {
    const response = await api.delete(`url/${urlId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error deleting URL' };
  }
};