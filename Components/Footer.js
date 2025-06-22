// // src/Components/Footer.js

// import Image from "next/image";
// import Link from "next/link";

// export default function Footer() {
//   return (
//     <footer style={styles.footer}>
//       <div style={styles.logoSection}>
//         <Image
//           src="/logo.png" // ✅ Ensure logo.png is in public/
//           alt="Job Alert Logo"
//           width={40}
//           height={40}
//         />
//         <span style={styles.text}>Job Alert</span>
//       </div>
//       <div style={styles.rights}>© {new Date().getFullYear()} Job Alert. All rights reserved.</div>
//     </footer>
//   );
// }

// const styles = {
//   footer: {
//     marginTop: "3rem",
//     padding: "1.5rem 2rem",
//     backgroundColor: "#f5f5f5",
//     borderTop: "1px solid #ccc",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexWrap: "wrap",
//   },
//   logoSection: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//   },
//   text: {
//     fontWeight: "bold",
//     fontSize: "1.2rem",
//   },
//   rights: {
//     fontSize: "0.9rem",
//     color: "#666",
//     marginTop: "0.5rem",
//   },
// };

// src/Components/Footer.js

import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "../Components/Firebase"; // adjust if needed
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function Footer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const trackVisitor = async () => {
      const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
      const docRef = doc(db, "analytics", "dailyVisitors");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.date === today) {
          await updateDoc(docRef, {
            count: data.count + 1,
          });
          setCount(data.count + 1);
        } else {
          await setDoc(docRef, {
            date: today,
            count: 1,
          });
          setCount(1);
        }
      } else {
        await setDoc(docRef, {
          date: today,
          count: 1,
        });
        setCount(1);
      }
    };

    trackVisitor();
  }, []);

  return (
    <footer style={styles.footer}>
      <div style={styles.logoSection}>
        <Image
          src="/logo.png"
          alt="Job Alert Logo"
          width={40}
          height={40}
        />
        <span style={styles.text}>Job Alert</span>
      </div>

      <div style={styles.visitors}>👥 Today's Visitors: <strong>{count}</strong></div>

      <div style={styles.rights}>
        © {new Date().getFullYear()} Job Alert. All rights reserved.
      </div>
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
    flexDirection: "row",
    gap: "1rem",
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
  },
  visitors: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#333",
  },
};
