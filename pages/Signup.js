// // pages/Signup.js

// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useRouter } from "next/router";
// import { auth } from "../Components/Firebase";
// import Navbar from "../Components/NavBar";
// import Footer from "../Components/Footer";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("Signup successful. You can now login.");
//       router.push("/Login");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div style={styles.container}>
//         <h2>Admin Signup</h2>
//         <form onSubmit={handleSignup} style={styles.form}>
//           <input
//             type="email"
//             placeholder="Enter email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Enter password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Sign Up</button>
//           {error && <p style={styles.error}>{error}</p>}
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "4rem auto",
//     padding: "2rem",
//     textAlign: "center",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1rem",
//     marginTop: "1rem",
//   },
//   error: {
//     color: "red",
//     marginTop: "1rem",
//   },
// };



import { useState } from "react";
import { auth, db, storage } from "../Components/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const colleges = [
  "CV Raman Global University",
  "KIIT University",
  "NIT Rourkela",
  "IIT Bombay",
  "Others",
];

export default function SignupAlumni() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    batch: "",
    branch: "",
    college: colleges[0],
    linkedin: "",
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const uid = userCred.user.uid;
      let photoURL = "";

      if (photo) {
        const imageRef = ref(storage, `alumniPhotos/${uuidv4()}-${photo.name}`);
        await uploadBytes(imageRef, photo);
        photoURL = await getDownloadURL(imageRef);
      }

      await setDoc(doc(db, "alumni", uid), {
        name: form.name,
        email: form.email,
        batch: form.batch,
        branch: form.branch,
        college: form.college,
        linkedin: form.linkedin,
        photo: photoURL,
      });

      router.push("/Alumni");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Alumni Signup</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input name="batch" placeholder="Batch (e.g. 2020)" value={form.batch} onChange={handleChange} required />
        <input name="branch" placeholder="Branch (e.g. CSE)" value={form.branch} onChange={handleChange} required />
        <select name="college" value={form.college} onChange={handleChange}>
          {colleges.map((college, i) => (
            <option key={i} value={college}>{college}</option>
          ))}
        </select>
        <input name="linkedin" placeholder="LinkedIn URL" value={form.linkedin} onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: "2rem", maxWidth: "400px", margin: "auto" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
};
