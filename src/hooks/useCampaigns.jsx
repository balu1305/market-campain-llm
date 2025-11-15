import { useState, useEffect } from 'react';
import { campaignsService } from '../services/campaigns.jsx';
import { useAuth } from './useAuth.jsx';

export const useCampaigns = (filters = {}) => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchCampaigns = async (newFilters = filters) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await campaignsService.getCampaigns(newFilters);
      setCampaigns(response.campaigns || []);
      setPagination(response.pagination || null);
    } catch (err) {
      setError(err.message);
      setCampaigns([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const createCampaign = async (campaignData) => {
    try {
      setError(null);
      const newCampaign = await campaignsService.createCampaign(campaignData);
      setCampaigns(prev => [newCampaign, ...prev]);
      return newCampaign;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateCampaign = async (id, campaignData) => {
    try {
      setError(null);
      const updatedCampaign = await campaignsService.updateCampaign(id, campaignData);
      setCampaigns(prev => 
        prev.map(campaign => 
          campaign.id === id ? updatedCampaign : campaign
        )
      );
      return updatedCampaign;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteCampaign = async (id) => {
    try {
      setError(null);
      await campaignsService.deleteCampaign(id);
      setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    campaigns,
    isLoading,
    error,
    pagination,
    fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    refetch: () => fetchCampaigns(filters)
  };
};

// Hook for campaign statistics
export const useCampaignStats = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const fetchStats = async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await campaignsService.getCampaignStats();
      setStats(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats
  };
};

// Hook for dashboard campaigns
export const useDashboardCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const fetchDashboardCampaigns = async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await campaignsService.getDashboardCampaigns();
      setCampaigns(response.campaigns || []);
    } catch (err) {
      setError(err.message);
      setCampaigns([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardCampaigns();
    }
  }, [isAuthenticated]);

  return {
    campaigns,
    isLoading,
    error,
    refetch: fetchDashboardCampaigns
  };
};