import { useState, useEffect } from 'react';
import { personasService } from '../services/personas.jsx';
import { useAuth } from './useAuth.jsx';

export const usePersonas = (filters = {}) => {
  const [personas, setPersonas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const fetchPersonas = async (newFilters = filters) => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await personasService.getPersonas(newFilters);
      setPersonas(response.personas || []);
    } catch (err) {
      setError(err.message);
      setPersonas([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPersonas();
    }
  }, [isAuthenticated]);

  const createPersona = async (personaData) => {
    try {
      setError(null);
      const newPersona = await personasService.createPersona(personaData);
      setPersonas(prev => [newPersona, ...prev]);
      return newPersona;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updatePersona = async (id, personaData) => {
    try {
      setError(null);
      const updatedPersona = await personasService.updatePersona(id, personaData);
      setPersonas(prev => 
        prev.map(persona => 
          persona.id === id ? updatedPersona : persona
        )
      );
      return updatedPersona;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deletePersona = async (id) => {
    try {
      setError(null);
      await personasService.deletePersona(id);
      setPersonas(prev => prev.filter(persona => persona.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    personas,
    isLoading,
    error,
    fetchPersonas,
    createPersona,
    updatePersona,
    deletePersona,
    refetch: () => fetchPersonas(filters)
  };
};

// Hook for persona statistics
export const usePersonaStats = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await personasService.getPersonaStats();
      setStats(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats
  };
};