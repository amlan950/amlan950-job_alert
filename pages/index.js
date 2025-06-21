
import { useState ,useEffect} from 'react';
import Navbar from '../Components/NavBar';
import SubNavbar from '../Components/SubNavBar';
import JobCard from '../Components/JobCard';
import { db } from '../Components/Firebase'; // adjust path as needed
import { collection, getDocs } from 'firebase/firestore';
import Footer from '../Components/Footer';
import CarouselBanner from '../Components/CarouselBanner';

// useEffect(() => {
//   const fetchJobs = async () => {
//     const querySnapshot = await getDocs(collection(db, "jobs"));
//     const jobList = querySnapshot.docs.map((doc) => doc.data());
//     setJobs(jobList);
//   };

//   fetchJobs();
// }, []);

// export default function HomePage() {
//   const [filter, setFilter] = useState(null);
//   const [jobs, setJobs] = useState([]);

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

  // ✅ Fetch jobs from Firebase only
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobList = querySnapshot.docs.map((doc) => doc.data());
        setJobs(jobList);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  // ✅ Determine if job is new
  function isNewJob(dateString) {
    const jobDate = new Date(dateString);
    const today = new Date();
    return (today - jobDate) / (1000 * 60 * 60 * 24) <= 1;
  }

  // ✅ Notifications for bell icon
  const notifications = {
    govt: jobs.some((job) => job.type === "govt" && isNewJob(job.postedOn)),
    private: jobs.some((job) => job.type === "private" && isNewJob(job.postedOn)),
  };

  // ✅ Filter based on selected tab
  const filteredJobs =
    filter && filter !== "all"
      ? jobs.filter((job) => job.type === filter)
      : jobs;

  return (
    <div>
      <Navbar />
      
      <SubNavbar onFilter={setFilter} notifications={notifications} />
      <CarouselBanner />
      <div style={styles.grid}>
        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          filteredJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))
        )}
      </div>
      
      <Footer />
    </div>
  );
}
const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "1.5rem",
    padding: "1rem",
  },
};

