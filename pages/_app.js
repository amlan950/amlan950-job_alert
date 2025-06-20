import React from "react";
import { JobProvider } from "../context/Contexxt";



function App({ Component, pageProps }) {
  return (
    <JobProvider>
      <Component {...pageProps} />
    </JobProvider>
  );
}

export default App;
