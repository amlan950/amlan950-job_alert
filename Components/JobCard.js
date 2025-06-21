// components/JobCard.js

export default function JobCard({
  title,
  company,
  location,
  postedOn,
  link,
  target = "_blank",
  type,
  description,
  pdfLink
}) {
  return (
    <div style={styles.card}>
      <h2>{title}</h2>
      <p><strong>Company:</strong> {company}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><em>Posted on: {postedOn}</em></p>
      <p><strong>Type:</strong> {type === "govt" ? "Government" : "Private"}</p>

      {description && (
        <p style={styles.desc}><strong>Description:</strong> {description}</p>
      )}

      <a href={link} target={target} rel="noopener noreferrer">
        View Job
      </a>

      {/* ✅ Show Notification PDF only if Government */}
      {type === "govt" && pdfLink && (
        <div style={{ marginTop: "0.5rem" }}>
          📄 <a href={pdfLink} target="_blank" rel="noopener noreferrer">
            View Official Notification (PDF)
          </a>
        </div>
      )}
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
  desc: {
    margin: "1rem 0",
    fontSize: "0.95rem",
    color: "#444",
  },
};
