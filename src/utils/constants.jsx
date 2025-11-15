// API Configuration Constants
export const API_BASE_URL = 'http://localhost:5002/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register', 
    PROFILE: '/auth/profile',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout'
  },
  
  // Personas
  PERSONAS: {
    LIST: '/personas',
    CREATE: '/personas',
    GET_BY_ID: (id) => `/personas/${id}`,
    UPDATE: (id) => `/personas/${id}`,
    DELETE: (id) => `/personas/${id}`,
    STATS: '/personas/stats'
  },
  
  // Campaigns
  CAMPAIGNS: {
    LIST: '/campaigns',
    CREATE: '/campaigns',
    GET_BY_ID: (id) => `/campaigns/${id}`,
    UPDATE: (id) => `/campaigns/${id}`,
    DELETE: (id) => `/campaigns/${id}`,
    ARCHIVE: (id) => `/campaigns/${id}/archive`,
    STATS: '/campaigns/stats',
    DASHBOARD: '/campaigns/dashboard',
    ADD_CONTENT: (id) => `/campaigns/${id}/content`
  },
  
  // Content Generation
  CONTENT: {
    AI_STATUS: '/content/ai-status',
    GENERATE_EMAIL: '/content/generate-email',
    GENERATE_SOCIAL: '/content/generate-social',
    GENERATE_AD_COPY: '/content/generate-ad-copy',
    GENERATE_VARIATIONS: '/content/generate-variations',
    BATCH_GENERATE: '/content/batch-generate'
  },
  
  // System
  SYSTEM: {
    HEALTH: '/health',
    ROOT: '/'
  }
};

// Request configurations
export const REQUEST_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

// Local storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'marketing_llm_access_token',
  REFRESH_TOKEN: 'marketing_llm_refresh_token',
  USER_PROFILE: 'marketing_llm_user_profile'
};