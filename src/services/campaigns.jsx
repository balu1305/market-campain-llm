import { apiClient, handleApiResponse, handleApiError } from './api.jsx';
import { API_ENDPOINTS } from '../utils/constants.jsx';

// Campaigns service
export const campaignsService = {
  // Get all campaigns
  async getCampaigns(filters = {}) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CAMPAIGNS.LIST, filters);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Create new campaign
  async createCampaign(campaignData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CAMPAIGNS.CREATE, campaignData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get campaign by ID
  async getCampaignById(id) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CAMPAIGNS.GET_BY_ID(id));
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update campaign
  async updateCampaign(id, campaignData) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.CAMPAIGNS.UPDATE(id), campaignData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Delete campaign
  async deleteCampaign(id) {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.CAMPAIGNS.DELETE(id));
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Archive campaign
  async archiveCampaign(id) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.CAMPAIGNS.ARCHIVE(id));
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get campaign statistics
  async getCampaignStats() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CAMPAIGNS.STATS);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get campaigns for dashboard
  async getDashboardCampaigns() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CAMPAIGNS.DASHBOARD);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Add content to campaign
  async addContentToCampaign(id, contentData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CAMPAIGNS.ADD_CONTENT(id), contentData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};