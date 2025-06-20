// components/AlertBanner.js

export default function AlertBanner({ message }) {
  return (
    <div style={styles.banner}>
      <strong>🔔 Alert:</strong> {message}
    </div>
  );
}

const styles = {
  banner: {
    padding: "0.75rem 1rem",
    backgroundColor: "#ffeeba",
    border: "1px solid #f0ad4e",
    color: "#856404",
    marginBottom: "1rem",
    borderRadius: "5px",
  },
};
