// components/JobCard.js

export default function JobCard({ title, company, location, postedOn , link ,target = "_blank"}) {
  return (
    <div style={styles.card}>
      <h2>{title}</h2>
      <p><strong>Company:</strong> {company}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><em>Posted on: {postedOn}</em></p>
         <a href={link} target={target} rel="noopener noreferrer">
        View Job
      </a>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
};
