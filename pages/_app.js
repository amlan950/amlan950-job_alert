import React from "react";
import { JobProvider } from "../context/Contexxt";
import "@/styles/globals.css";
import Navbar from "@/Components/NavBar";

function App({ Component, pageProps }) {
  return (
    <JobProvider>
      <Component {...pageProps} />
    </JobProvider>
  );
}

export default App;
