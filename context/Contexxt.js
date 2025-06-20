import { createContext, useState, useEffect } from "react";

export const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobList")) || [];
    setJobs(storedJobs);
  }, []);

  const addJob = (job) => {
    const updated = [...jobs, job];
    setJobs(updated);
    localStorage.setItem("jobList", JSON.stringify(updated));
  };

  return (
    <JobContext.Provider value={{ jobs, addJob }}>
      {children}
    </JobContext.Provider>
  );
}
