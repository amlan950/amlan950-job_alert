// // components/SubNavBar.js
// import { useState } from "react";

// export default function SubNavBar({ onFilter }) {
//   const [activeTab, setActiveTab] = useState("all");

//   const handleClick = (type) => {
//     setActiveTab(type);
//     if (onFilter) onFilter(type);
//   };

//   return (
//     <div style={styles.container}>
//       <button
//         onClick={() => handleClick("all")}
//         style={activeTab === "all" ? styles.active : styles.button}
//       >
//         All Jobs
//       </button>
//       <button
//         onClick={() => handleClick("govt")}
//         style={activeTab === "govt" ? styles.active : styles.button}
//       >
//         Govt Jobs
//       </button>
//       <button
//         onClick={() => handleClick("private")}
//         style={activeTab === "private" ? styles.active : styles.button}
//       >
//         Private Jobs
//       </button>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     margin: "1rem 0",
//     gap: "1rem",
//   },
//   button: {
//     padding: "0.5rem 1rem",
//     border: "1px solid #ccc",
//     background: "#f9f9f9",
//     cursor: "pointer",
//     borderRadius: "5px",
//   },
//   active: {
//     padding: "0.5rem 1rem",
//     border: "2px solid #0070f3",
//     background: "#e6f0ff",
//     cursor: "pointer",
//     borderRadius: "5px",
//     fontWeight: "bold",
//   },
// };
// components/SubNavbar.js

// components/SubNavbar.js
import { useEffect, useState } from "react";

export default function SubNavbar({ onFilter, notifications = {} }) {
  const [readStatus, setReadStatus] = useState({});

  // 🔹 Load read status from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("readStatus");
    if (stored) setReadStatus(JSON.parse(stored));
  }, []);

  // 🔹 Handle click on a tab and mark notification as read
  const handleClick = (type) => {
    onFilter(type);
    const updated = { ...readStatus, [type]: true };
    setReadStatus(updated);
    localStorage.setItem("readStatus", JSON.stringify(updated));
  };

  const shouldShowBell = (type) => notifications[type] && !readStatus[type];

  return (
    <div style={styles.container}>
        {/* 🔹 Buttons for each job type with notification bell */ }
      <button style={styles.button} onClick={() => handleClick("all")}>
        All Jobs {shouldShowBell("all") && <span style={styles.alert}>🔔</span>}
        </button>

      <button style={styles.button} onClick={() => handleClick("govt")}>
        Government Jobs {shouldShowBell("govt") && <span style={styles.alert}>🔔</span>}
      </button>

      <button style={styles.button} onClick={() => handleClick("private")}>
        Private Jobs {shouldShowBell("private") && <span style={styles.alert}>🔔</span>}
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ccc",
  },
  button: {
    position: "relative",
    padding: "0.5rem 1.5rem",
    fontSize: "1rem",
    cursor: "pointer",
    border: "1px solid #0070f3",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "#0070f3",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  alert: {
    marginLeft: "0.4rem",
    fontSize: "1.1rem",
    animation: "pulse 1s infinite",
  },
};
