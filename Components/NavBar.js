

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase"; // adjust path as needed
import { useRouter } from "next/router";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // ✅ Track logged-in user
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log("User:", user); // ✅ shows user object or null
    setUser(user); // save to state
  });
  return () => unsubscribe();
}, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/Login");
  };
  const handleAlumniAccess = () => {
  if (!user) {
    // First-time visitor ➜ redirect to Signup
    if (!localStorage.getItem("alumniAccessed")) {
      localStorage.setItem("alumniAccessed", "true");
      router.push("/SignupAlumni");
    } else {
      router.push("/LoginAlumni");
    }
  } else {
    router.push("/Alumni");
  }
};


  return (
    <nav style={styles.nav}>
      {/* ✅ Left: Logo */}
      <div style={styles.left}>
        <Link href="/" style={styles.logo}>
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span style={styles.text}>Job Alert</span>
        </Link>
      </div>

      {/* ✅ Right: Links and Buttons */}
      <div style={styles.right}>
        <Link href="/" style={styles.link}>Home</Link>
        <Link href="/Information" style={styles.link}>Info</Link>
        <Link href="/AdminPage" style={styles.link}>Admin</Link>


        {user ? (
          <>
            <span style={styles.email}>👤 {user.email}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/Login" style={styles.loginBtn}>Login</Link>
            <Link href="/Signup" style={styles.signupBtn}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
nav: {
  position: "sticky",        // ✅ makes it stick
  top: 0,                    // ✅ stick to top
  zIndex: 1000,              // ✅ stay above other content
  backgroundColor: "#333",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
},

  left: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  text: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginLeft: "0.5rem",
    color: "white",
  },
right: {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",         // ✅ allow wrapping on small screens
  gap: "0.5rem",
  justifyContent: "flex-end",
  maxWidth: "100%",
},
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
  },
loginBtn: {
  padding: "0.5rem 1rem",
  backgroundColor: "#0070f3",
  color: "#fff",
  borderRadius: "8px",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "0.9rem",
  whiteSpace: "nowrap",     // ✅ avoid cutting text mid-line
},

signupBtn: {
  padding: "0.5rem 1rem",
  backgroundColor: "#22c55e",
  color: "#fff",
  borderRadius: "8px",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "0.9rem",
  whiteSpace: "nowrap",
},
logoutBtn: {
  padding: "0.5rem 1rem",
  backgroundColor: "#ef4444",
  color: "#fff",
  borderRadius: "8px",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
  fontSize: "0.9rem",
  whiteSpace: "nowrap",
},
email: {
  fontSize: "0.85rem",
  color: "#ccc",
  maxWidth: "100%",
  wordBreak: "break-word",
},
};
