import { apiClient, handleApiResponse, handleApiError } from './api.jsx';
import { API_ENDPOINTS } from '../utils/constants.jsx';

// Personas service
export const personasService = {
  // Get all personas
  async getPersonas(filters = {}) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PERSONAS.LIST, filters);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Create new persona
  async createPersona(personaData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.PERSONAS.CREATE, personaData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get persona by ID
  async getPersonaById(id) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PERSONAS.GET_BY_ID(id));
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update persona
  async updatePersona(id, personaData) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.PERSONAS.UPDATE(id), personaData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Delete persona
  async deletePersona(id) {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.PERSONAS.DELETE(id));
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get persona statistics
  async getPersonaStats() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PERSONAS.STATS);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};