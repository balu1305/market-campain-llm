import { API_ENDPOINTS, API_BASE_URL, REQUEST_CONFIG, STORAGE_KEYS } from '../utils/constants.jsx';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

// Create request headers with auth token
const createHeaders = (includeAuth = true) => {
  const headers = { ...REQUEST_CONFIG.HEADERS };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Base API client with error handling
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      timeout: REQUEST_CONFIG.TIMEOUT,
      headers: createHeaders(options.includeAuth !== false),
      ...options,
    };

    // Check if auth is required but no token is available
    if (options.includeAuth !== false && !getAuthToken()) {
      throw new Error('Access token is required');
    }

    try {
      const response = await fetch(url, config);
      
      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Handle different content types
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  // POST request
  async post(endpoint, data = {}, includeAuth = true) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      includeAuth,
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Helper function for handling API responses
export const handleApiResponse = (response) => {
  if (response.success === false) {
    throw new Error(response.message || 'API request failed');
  }
  return response.data || response;
};

// Helper function for handling API errors
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  // Handle specific error types
  if (error.message.includes('401')) {
    // Unauthorized - redirect to login
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    window.location.href = '/login';
    return;
  }
  
  throw error;
};