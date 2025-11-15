import { apiClient, handleApiResponse, handleApiError } from './api.jsx';
import { API_ENDPOINTS } from '../utils/constants.jsx';

// Content generation service
export const contentService = {
  // Check AI service status
  async getAiStatus() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CONTENT.AI_STATUS);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Generate email content
  async generateEmail(data) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CONTENT.GENERATE_EMAIL, data);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Generate social media content
  async generateSocial(data) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CONTENT.GENERATE_SOCIAL, data);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Generate ad copy
  async generateAdCopy(data) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CONTENT.GENERATE_AD_COPY, data);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Generate content variations for A/B testing
  async generateVariations(data) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CONTENT.GENERATE_VARIATIONS, data);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Batch generate content for multiple platforms
  async batchGenerate(data) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CONTENT.BATCH_GENERATE, data);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};