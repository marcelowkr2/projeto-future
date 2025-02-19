// frontend/pages/_app.js
import React from "react";
import Navbar from "../components/Navbar";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "../hooks/useAuth";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <AuthProvider>
      <CssBaseline />
      <Navbar />
      <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};

export default MyApp;
