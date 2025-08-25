import React, { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { CVSS31 } from "../utils/cvss31";

function CVSS31Form() {
  const [result, setResult] = useState(null);
  const [vector, setVector] = useState("");

  const handleChange = () => {
    // Collect values from form fields
    const AV = document.getElementById("AV").value;
    const AC = document.getElementById("AC").value;
    const PR = document.getElementById("PR").value;
    const UI = document.getElementById("UI").value;
    const S = document.getElementById("S").value;
    const C = document.getElementById("C").value;
    const I = document.getElementById("I").value;
    const A = document.getElementById("A").value;

    const calc = CVSS31.calculateCVSSFromMetrics(
      AV, AC, PR, UI, S, C, I, A
    );
    if (calc.success) {
      setResult(calc);
      setVector(calc.vectorString);
    }
  };

  const renderSelect = (label, id, options) => (
    <Form.Group className="mb-3">
      <Form.Label style={{ color: "#00ff66" }}>{label}</Form.Label>
      <Form.Select
        id={id}
        onChange={handleChange}
        style={{
          backgroundColor: "#0d0d0d",
          color: "#dcdcdc",
          border: "1px solid #00ff66",
        }}
      >
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
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
            CVSS v3.1 Calculator
          </Card.Title>
          <Form>
            {renderSelect("Attack Vector (AV)", "AV", ["N", "A", "L", "P"])}
            {renderSelect("Attack Complexity (AC)", "AC", ["L", "H"])}
            {renderSelect("Privileges Required (PR)", "PR", ["N", "L", "H"])}
            {renderSelect("User Interaction (UI)", "UI", ["N", "R"])}
            {renderSelect("Scope (S)", "S", ["U", "C"])}
            {renderSelect("Confidentiality (C)", "C", ["N", "L", "H"])}
            {renderSelect("Integrity (I)", "I", ["N", "L", "H"])}
            {renderSelect("Availability (A)", "A", ["N", "L", "H"])}
          </Form>

          {result && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              Score:{" "}
              <span style={{ color: "#00ff66", fontWeight: "bold" }}>
                {result.baseMetricScore}
              </span>{" "}
              — {result.baseSeverity}
              <br />
              <small style={{ color: "#a6a6a6" }}>{vector}</small>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CVSS31Form;
