import { Job } from '../../types/job';
import api from './api';
export const jobService = {
  getAllJobs: async (): Promise<Job[]> => {
    try {
      const response = await api.get<Job[]>('/jobOpportunities');
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch jobs');
    }
  },
  getJobById: async (id: number): Promise<Job> => {
    try {
      const response = await api.get<Job>(`/jobOpportunities/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch job details');
    }
  }
};