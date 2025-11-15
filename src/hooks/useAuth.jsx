import { useState, useEffect, useContext, createContext } from 'react';
import { authService } from '../services/auth.jsx';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is logged in
      if (authService.isAuthenticated()) {
        const storedUser = authService.getStoredUser();
        
        if (storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
          
          // Verify token is still valid by fetching profile
          try {
            const profile = await authService.getProfile();
            if (profile.user) {
              setUser(profile.user);
            }
          } catch (error) {
            console.error('Token validation failed:', error);
            await logout();
          }
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await authService.login(email, password);
      
      if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await authService.updateProfile(userData);
      if (response.user) {
        setUser(response.user);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    initializeAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};