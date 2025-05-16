import { useState, useEffect } from 'react';
import { Project } from '@/app/types/project';
import { projectService } from '@/app/services/api/projectService';
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAllProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  };
};