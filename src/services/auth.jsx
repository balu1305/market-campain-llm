import { apiClient, handleApiResponse, handleApiError } from './api.jsx';
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants.jsx';

// Authentication service
export const authService = {
  // Login user
  async login(email, password) {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.LOGIN,
        { email, password },
        false // Don't include auth token for login
      );
      
      const data = handleApiResponse(response);
      
      // Store tokens and user data
      if (data.accessToken) {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
      }
      if (data.user) {
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Register new user
  async register(userData) {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.REGISTER,
        userData,
        false // Don't include auth token for registration
      );
      
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get current user profile
  async getProfile() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.PROFILE);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.AUTH.PROFILE, userData);
      const data = handleApiResponse(response);
      
      // Update stored user data
      if (data.user) {
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Refresh access token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        { refreshToken },
        false
      );
      
      const data = handleApiResponse(response);
      
      // Update stored access token
      if (data.accessToken) {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      }
      
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Logout user
  async logout() {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local logout even if API fails
    } finally {
      // Clear all stored auth data
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  // Get stored user data
  getStoredUser() {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return userData ? JSON.parse(userData) : null;
  }
};