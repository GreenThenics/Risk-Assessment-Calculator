import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0d0d0d",
        borderTop: "1px solid #00ff66",
        color: "#a6a6a6",
        padding: "20px 0",
        marginTop: "40px",
      }}
    >
      <Container className="text-center">
        <h5 style={{ color: "#00ff66", marginBottom: "10px" }}>About This Project</h5>
        <p style={{ fontSize: "0.9rem", maxWidth: "1000px", margin: "0 auto" }}>
          The <strong>Risk Assessment Calculator</strong> is a security-focused web app
          designed to help organizations and individuals evaluate vulnerabilities 
          and threats using <span style={{ color: "#00ff66" }}>OWASP Risk Rating</span>, 
          <span style={{ color: "#00ff66" }}> CVSS v3.1</span>, and 
          <span style={{ color: "#00ff66" }}> CVSS v4.0</span>.  
          It provides a user-friendly interface to calculate scores, understand 
          risk levels, and document findings.
        </p>
        <p style={{ marginTop: "15px", fontSize: "0.8rem", color: "#666" }}>
          © {new Date().getFullYear()} Risk Assessment Toolkit.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
