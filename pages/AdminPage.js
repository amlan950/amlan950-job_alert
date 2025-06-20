import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { db } from "../Firebase"; // ✅ Adjust path if needed
import { collection, addDoc, getDocs } from "firebase/firestore";
import JobCard from "../Components/JobCard";

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

  const router = useRouter();

  // ✅ Fetch jobs from Firestore
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsFromFirebase = querySnapshot.docs.map(doc => doc.data());
        setJobs(jobsFromFirebase);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit job to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "jobs"), form);
      router.push('/');
    } catch (error) {
      console.error("Error adding job:", error);
    }

    // Clear form
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
