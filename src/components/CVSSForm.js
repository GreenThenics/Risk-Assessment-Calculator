import React, { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import metricsData from "../utils/metrics.json";
import { Vector, CVSS40 } from "../utils/cvss";

function CVSSForm({ onComplete }) {
  const [vector] = useState(new Vector());
  const [cvss, setCvss] = useState(new CVSS40(vector));

  const handleChange = (short, value) => {
    vector.updateMetric(short, value);

    const calc = new CVSS40(vector);
    calc.calculateScore();
    setCvss(calc);

    onComplete &&
      onComplete({
        score: calc.score,
        severity: calc.severity,
        vector: vector.raw,
      });
  };

  return (
    <Container className="my-4">
      <Card
        className="shadow-lg border-0"
        style={{
          background: "linear-gradient(145deg, #0d0d0d, #1a1a1a)",
          border: "1px solid #00ff66",
          borderRadius: "15px",
          color: "#dcdcdc",
        }}
      >
        <Card.Body>
          <Card.Title style={{ color: "#00ff66", textAlign: "center" }}>
            CVSS v4 Risk Calculator
          </Card.Title>

          <Form>
            {Object.entries(metricsData["Base Metrics"].metric_groups).map(
              ([groupName, groupMetrics]) => (
                <div key={groupName} className="mb-4">
                  <h5 style={{ color: "#00ff66" }}>{groupName}</h5>
                  {Object.entries(groupMetrics).map(([metricName, metric]) => (
                    <Form.Group key={metric.short} className="mb-3">
                      <Form.Label style={{ color: "#00ff66" }}>
                        {metricName} ({metric.short})
                      </Form.Label>
                      <Form.Select
                        onChange={(e) =>
                          handleChange(metric.short, e.target.value)
                        }
                        style={{
                          backgroundColor: "#0d0d0d",
                          color: "#dcdcdc",
                          border: "1px solid #00ff66",
                        }}
                      >
                        <option value="">-- Select --</option>
                        {Object.entries(metric.options).map(([optName, opt]) => (
                          <option key={opt.value} value={opt.value}>
                            {optName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  ))}
                </div>
              )
            )}
          </Form>

          {cvss && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              Score:{" "}
              <span style={{ color: "#00ff66", fontWeight: "bold" }}>
                {cvss.score}
              </span>{" "}
              — {cvss.severity}
              <br />
              <small style={{ color: "#a6a6a6" }}>{vector.raw}</small>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CVSSForm;
