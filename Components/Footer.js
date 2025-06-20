// src/Components/Footer.js

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.logoSection}>
        <Image
          src="/logo.png" // ✅ Ensure logo.png is in public/
          alt="Job Alert Logo"
          width={40}
          height={40}
        />
        <span style={styles.text}>Job Alert</span>
      </div>
      <div style={styles.rights}>© {new Date().getFullYear()} Job Alert. All rights reserved.</div>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "3rem",
    padding: "1.5rem 2rem",
    backgroundColor: "#f5f5f5",
    borderTop: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  text: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  rights: {
    fontSize: "0.9rem",
    color: "#666",
    marginTop: "0.5rem",
  },
};
