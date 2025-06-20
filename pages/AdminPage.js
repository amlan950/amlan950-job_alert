

import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Context } from '../context/Contexxt';
import { useState, useEffect } from "react";
import JobCard from "../Components/JobCard";


// const { jobs, addJob } = useContext(Context);

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    postedOn: "",
    link: "",
    type: "govt",
  });
  const router = useRouter(); // ✅ define router

  useEffect(() => {
    const stored = localStorage.getItem("jobList");
    if (stored) setJobs(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const updatedJobs = [...jobs, form];
  setJobs(updatedJobs);
  localStorage.setItem("jobList", JSON.stringify(updatedJobs));

  // ✅ Redirect to homepage
  router.push('/');
    // Reset form
    setForm({
      title: "",
      company: "",
      location: "",
      postedOn: "",
      link: "",
      type: "govt",
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Add a Job</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input name="postedOn" placeholder="YYYY-MM-DD" value={form.postedOn} onChange={handleChange} required />
        <input name="link" placeholder="Job Link" value={form.link} onChange={handleChange} required />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="govt">Government</option>
          <option value="private">Private</option>
        </select>
        
        <button type="submit">Submit Job</button>
      </form>

      <h2 style={{ marginTop: "2rem" }}>Preview:</h2>
      {jobs.map((job, index) => (
        <JobCard key={index} {...job} />
      ))}
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "400px",
  },
};
