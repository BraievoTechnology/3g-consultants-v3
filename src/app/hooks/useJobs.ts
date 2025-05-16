import { useState, useEffect } from 'react';
import { Job } from '@/app/types/job';
import { jobService } from '@/app/services/api/jobService';
export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    fetchJobs().then(r => {
      console.log(r)
    });
  }, []);
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getAllJobs();
      setJobs(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  return {
    jobs,
    loading,
    error,
    refetch: fetchJobs
  };
};
export const useJob = (id: number) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    fetchJob().then(r => {
      console.log(r)
    });
  }, [id]);
  const fetchJob = async () => {
    try {
      setLoading(true);
      const data = await jobService.getJobById(id);
      setJob(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  return {
    job,
    loading,
    error,
    refetch: fetchJob
  };
};