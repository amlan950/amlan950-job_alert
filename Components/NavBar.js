// components/Navbar.js
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
       {/* ✅ Replace text with image */}
      <Link href="/" style={styles.logo}>
        <Image 
          src="/logo.png" // ✅ Put your image in /public/logo.png
          alt="Job Alert Logo" 
          width={40} 
          height={40} 
        />
      </Link>
      <div>
        <Link href="/" style={styles.link}>Home</Link>
              <a href="/AdminPage" style={styles.link}>Admin Page</a>

      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    backgroundColor: "#333",
    color: "#fff",
    alignItems: "center",
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  link: {
    marginLeft: "1rem",
    color: "#fff",
    textDecoration: "none",
  },
    text: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: '0.5rem',
    fontSize: '1.2rem',
  },
};
