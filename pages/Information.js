// pages/Information.js

import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import Image from 'next/image';

export default function Information() {
  return (
    <>
      <Navbar />

      <div style={styles.logoContainer}>
        <Image
          src="/logo.png" // ✅ Make sure logo.png exists in public/
          alt="Job Alert Logo"
          width={120}
          height={120}
        />
        <h1 style={styles.appName}>Job Alert</h1>
      </div>

      <div style={styles.container}>
        <h2 style={styles.title}>About Job Alert</h2>
        <p style={styles.text}>
          <strong>Job Alert</strong> is a simple platform to help users stay updated with the latest job opportunities, including government and private sector positions.
        </p>

        <h3 style={styles.subtitle}>How it works</h3>
        <ul style={styles.list}>
          <li>Jobs are submitted by administrators via the Admin Page.</li>
          <li>Jobs are stored in Firebase Firestore and displayed for all users.</li>
          <li>Filters allow users to quickly switch between government and private jobs.</li>
        </ul>

        <h3 style={styles.subtitle}>Disclaimer</h3>
        <p style={styles.text}>
          This application is for educational/demo purposes. Job details must be verified through official sources.
        </p>

        <h3 style={styles.subtitle}>Contact</h3>
        <p style={styles.text}>
          For suggestions or help, email <a href="mailto:contact@example.com">contact@example.com</a>.
        </p>
      </div>

      <Footer />
    </>
  );
}

const styles = {
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2rem',
  },
  appName: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: '0.5rem',
  },
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.3rem',
    marginTop: '2rem',
  },
  text: {
    fontSize: '1rem',
    marginTop: '0.5rem',
  },
  list: {
    paddingLeft: '1.5rem',
  },
};
