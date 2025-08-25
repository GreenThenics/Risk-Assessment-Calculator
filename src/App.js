import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavbarComp from "./components/Navbar";
import Home from "./components/Home";
import AssessmentForm from "./components/AssessmentForm";
import Results from "./components/Results";
import Report from "./components/Report";
import History from "./components/History";
import CVSSForm from "./components/CVSSForm";
import CVSSResults from "./components/CVSSResults";
import CVSS31Form from "./components/CVSS31Form";
import Footer from "./components/Footer";
import "../src/App.css";

function App() {
  // ✅ Define state for CVSS result
  const [cvssResult, setCvssResult] = useState(null);

  return (
    <>
      <NavbarComp />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<AssessmentForm />} />
          <Route path="/results" element={<Results />} />
          <Route path="/report" element={<Report />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/cvss"
            element={
              <>
                <CVSSForm onComplete={setCvssResult} />
                <CVSSResults result={cvssResult} />
              </>
            }
          />
          <Route path="/cvss31" element={<CVSS31Form />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
