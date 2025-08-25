import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CVSSForm from "./CVSSForm";   // CVSS v4
import CVSS31Form from "./CVSS31Form"; // ⬅️ new for CVSS 3.1

function AssessmentForm() {
  const navigate = useNavigate();
  const [assessmentType, setAssessmentType] = useState("OWASP"); // Default
  const [formData, setFormData] = useState({
    skillLevel: 0, motive: 0, opportunity: 0, size: 0,
    easeDiscovery: 0, easeExploit: 0, awareness: 0, intrusionDetection: 0,
    confidentiality: 0, integrity: 0, availability: 0, accountability: 0,
    financial: 0, reputation: 0, privacy: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];

    const record = {
      type: assessmentType,
      data: formData,
      date: new Date().toISOString(),
    };

    storedHistory.push(record);
    localStorage.setItem("history", JSON.stringify(storedHistory));
    localStorage.setItem("latestAssessment", JSON.stringify(record));

    if (assessmentType === "OWASP") {
      navigate("/results");
    } else if (assessmentType === "CVSS") {
      navigate("/cvss-results");   // CVSS v4 results
    } else if (assessmentType === "CVSS31") {
      navigate("/cvss31-results"); // CVSS v3.1 results
    }
  };

  const renderSelect = (label, name) => (
    <Form.Group className="mb-3">
      <Form.Label style={{ color: "#00ff66", fontWeight: "bold" }}>
        {label}
      </Form.Label>
      <Form.Select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        style={{
          backgroundColor: "#0d0d0d",
          color: "#dcdcdc",
          border: "1px solid #00ff66",
        }}
      >
        {[...Array(10).keys()].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );

  return (
    <Container className="my-4">
      <Card
        className="shadow-lg"
        style={{
          backgroundColor: "#141414",
          border: "1px solid #00ff66",
          color: "#dcdcdc",
        }}
      >
        <Card.Body>
          <Card.Title
            className="mb-4 fs-4 fw-bold"
            style={{ color: "#00ff66" }}
          >
            Risk Assessment Input
          </Card.Title>

          {/* 🔽 Dropdown to switch between OWASP, CVSS v4, and CVSS v3.1 */}
          <Form.Group className="mb-4">
            <Form.Label style={{ color: "#00ff66", fontWeight: "bold" }}>
              Select Assessment Type
            </Form.Label>
            <Form.Select
              value={assessmentType}
              onChange={(e) => setAssessmentType(e.target.value)}
              style={{
                backgroundColor: "#0d0d0d",
                color: "#dcdcdc",
                border: "1px solid #00ff66",
              }}
            >
              <option value="OWASP">OWASP Risk Rating</option>
              <option value="CVSS">CVSS v4 Score</option>
              <option value="CVSS31">CVSS v3.1 Score</option>
            </Form.Select>
          </Form.Group>

          {/* Conditionally render OWASP or CVSS calculators */}
          {assessmentType === "OWASP" ? (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <h5 style={{ color: "#00ff66" }}>
                    Threat Agent & Vulnerability
                  </h5>
                  {renderSelect("Skill Level", "skillLevel")}
                  {renderSelect("Motive", "motive")}
                  {renderSelect("Opportunity", "opportunity")}
                  {renderSelect("Size", "size")}
                  {renderSelect("Ease of Discovery", "easeDiscovery")}
                  {renderSelect("Ease of Exploit", "easeExploit")}
                  {renderSelect("Awareness", "awareness")}
                  {renderSelect("Intrusion Detection", "intrusionDetection")}
                </Col>

                <Col md={6}>
                  <h5 style={{ color: "#00ff66" }}>Technical Impact</h5>
                  {renderSelect("Confidentiality", "confidentiality")}
                  {renderSelect("Integrity", "integrity")}
                  {renderSelect("Availability", "availability")}
                  {renderSelect("Accountability", "accountability")}

                  <h5 className="mt-3" style={{ color: "#00ff66" }}>
                    Business Impact
                  </h5>
                  {renderSelect("Financial Damage", "financial")}
                  {renderSelect("Reputation Damage", "reputation")}
                  {renderSelect("Privacy Violation", "privacy")}
                </Col>
              </Row>

              <div className="text-center mt-4">
                <Button
                  type="submit"
                  size="lg"
                  style={{
                    backgroundColor: "#00ff66",
                    borderColor: "none",
                    color: "black",
                  }}
                >
                  ✅ Calculate Risk
                </Button>
              </div>
            </Form>
          ) : assessmentType === "CVSS" ? (
            <CVSSForm onSubmit={handleSubmit} />
          ) : (
            <CVSS31Form onSubmit={handleSubmit} />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AssessmentForm;
