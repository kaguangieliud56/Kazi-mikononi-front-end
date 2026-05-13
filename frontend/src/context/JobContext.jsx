import React, { createContext, useState, useContext, useCallback } from 'react';
import jobService from '../services/jobService';

const JobContext = createContext(null);

export const useJobs = () => {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error('useJobs must be used inside <JobProvider>');
  return ctx;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs]               = useState([]);
  const [myJobs, setMyJobs]           = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [currentJob, setCurrentJob]   = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  const withLoading = async (fn) => {
    setLoading(true);
    setError(null);
    try {
      return await fn();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Something went wrong.';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = useCallback((params) =>
    withLoading(async () => {
      const data = await jobService.getJobs(params);
      setJobs(data);
      return data;
    }), []);

  const fetchJobById = useCallback((id) =>
    withLoading(async () => {
      const data = await jobService.getJobById(id);
      setCurrentJob(data);
      return data;
    }), []);

  const createJob = useCallback((jobData) =>
    withLoading(async () => {
      const newJob = await jobService.createJob(jobData);
      setJobs((prev) => [newJob, ...prev]);
      setMyJobs((prev) => [newJob, ...prev]);
      return newJob;
    }), []);

  const updateJob = useCallback((id, jobData) =>
    withLoading(async () => {
      const updated = await jobService.updateJob(id, jobData);
      setJobs((prev) => prev.map((j) => (j._id === id ? updated : j)));
      setMyJobs((prev) => prev.map((j) => (j._id === id ? updated : j)));
      if (currentJob?._id === id) setCurrentJob(updated);
      return updated;
    }), [currentJob]);

  const deleteJob = useCallback((id) =>
    withLoading(async () => {
      await jobService.deleteJob(id);
      setJobs((prev) => prev.filter((j) => j._id !== id));
      setMyJobs((prev) => prev.filter((j) => j._id !== id));
      if (currentJob?._id === id) setCurrentJob(null);
    }), [currentJob]);

  const applyForJob = useCallback((jobId, applicationData) =>
    withLoading(async () => {
      const result = await jobService.applyForJob(jobId, applicationData);
      return result;
    }), []);

  const fetchMyJobs = useCallback(() =>
    withLoading(async () => {
      const data = await jobService.getMyJobs();
      setMyJobs(data);
      return data;
    }), []);

  const fetchMyApplications = useCallback(() =>
    withLoading(async () => {
      const data = await jobService.getMyApplications();
      setMyApplications(data);
      return data;
    }), []);

  return (
    <JobContext.Provider
      value={{
        jobs,
        myJobs,
        myApplications,
        currentJob,
        loading,
        error,
        fetchJobs,
        fetchJobById,
        createJob,
        updateJob,
        deleteJob,
        applyForJob,
        fetchMyJobs,
        fetchMyApplications,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
