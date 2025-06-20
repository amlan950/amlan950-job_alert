
import { useState ,useEffect} from 'react';
import Navbar from '../Components/NavBar';
import SubNavbar from '../Components/SubNavBar';
import JobCard from '../Components/JobCard';

// export default function HomePage() {
//   const [filter, setFilter] = useState(null);

//   // ✅ First: Define job array
//     // ✅ Load jobs from localStorage on first render
//   useEffect(() => {
//     const storedJobs = JSON.parse(localStorage.getItem("jobList")) || [];
//     setJobs(storedJobs);
//   }, []);

//   const jobs = [
//     {
//       title: "Railway Engineer",
//       company: "Indian Railways",
//       location: "Delhi",
//       postedOn: "2025-06-20",
//       link: "https://gov.in/railway",
//       type: "govt",
//     },
//     {
//       title: "Frontend Developer",
//       company: "TechSoft",
//       location: "Remote",
//       postedOn: "2025-06-18",
//       link: "https://techsoft.com/job",
//       type: "private",
//     },
//   ];

//   // ✅ Then: Define function to check if a job is new
//   function isNewJob(dateString) {
//     const jobDate = new Date(dateString);
//     const today = new Date();
//     const diff = (today - jobDate) / (1000 * 60 * 60 * 24);
//     return diff <= 1;
//   }

//   // ✅ Now: Calculate notification status using the jobs array
//   const notifications = {
//     govt: jobs.some((job) => job.type === 'govt' && isNewJob(job.postedOn)),
//     private: jobs.some((job) => job.type === 'private' && isNewJob(job.postedOn)),
//   };

//   // ✅ Optional filter logic
//   const filteredJobs = filter ? jobs.filter((job) => job.type === filter) : jobs;

//   return (
//     <div>
//       <Navbar />
//       <SubNavbar onFilter={setFilter} notifications={notifications} />
//       <div style={{ padding: '1rem' }}>
//         {filteredJobs.map((job, idx) => (
//           <JobCard key={idx} {...job} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const [filter, setFilter] = useState(null);
//   const [jobs, setJobs] = useState([]);

//   // ✅ Load jobs from localStorage on first render
//   useEffect(() => {
//     const storedJobs = JSON.parse(localStorage.getItem("jobList")) || [];
//     setJobs(storedJobs);
//   }, []);

//   function isNewJob(dateString) {
//     const jobDate = new Date(dateString);
//     const today = new Date();
//     return (today - jobDate) / (1000 * 60 * 60 * 24) <= 1;
//   }

//   const notifications = {
//     govt: jobs.some((job) => job.type === "govt" && isNewJob(job.postedOn)),
//     private: jobs.some((job) => job.type === "private" && isNewJob(job.postedOn)),
//   };

//   const filteredJobs =
//     filter && filter !== "all"
//       ? jobs.filter((job) => job.type === filter)
//       : jobs;

//   return (
//     <div>
//       <Navbar />
//       <SubNavbar onFilter={setFilter} notifications={notifications} />
//       <div style={{ padding: "1rem" }}>
//         {filteredJobs.length === 0 ? (
//           <p>No jobs found.</p>
//         ) : (
//           filteredJobs.map((job, index) => (
//             <JobCard key={index} {...job} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

  
export default function HomePage() {
  const [filter, setFilter] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobList")) || [];
    setJobs(storedJobs);
  }, []);

  function isNewJob(dateString) {
    const jobDate = new Date(dateString);
    const today = new Date();
    return (today - jobDate) / (1000 * 60 * 60 * 24) <= 1;
  }

  const notifications = {
    govt: jobs.some((job) => job.type === "govt" && isNewJob(job.postedOn)),
    private: jobs.some((job) => job.type === "private" && isNewJob(job.postedOn)),
  };

  const filteredJobs =
    filter && filter !== "all"
      ? jobs.filter((job) => job.type === filter)
      : jobs;

  return (
    <div>
      <Navbar />
      <SubNavbar onFilter={setFilter} notifications={notifications} />
      <div style={{ padding: "1rem" }}>
        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          filteredJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))
        )}
      </div>
    </div>
  );
}
