import React from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function History() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const assessments = Array.isArray(history) ? history : [];

  return (
    <Container className="my-4">
      <Card className="shadow-lg">
        <Card.Body>
          <Card.Title className="fs-4 fw-bold mb-4 text-center" style={{ color: "#00ff66" }}>
            📂 Assessment History
          </Card.Title>

          {assessments.length === 0 ? (
            <div className="text-center">
              <p className="text-muted mb-4">No past assessments available.</p>
              <Button
                as={Link}
                to="/assessment"
                style={{ backgroundColor: "#00ff66", border: "none", color: "black" }}
              >
                ➕ Start New Assessment
              </Button>
            </div>
          ) : (
            <>
              <Table
                bordered
                hover
                responsive
                className="text-center align-middle"
                style={{
                  backgroundColor: "#0d0d0d",
                  color: "#dcdcdc",
                  border: "1px solid #00ff66",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <thead style={{ backgroundColor: "#1a1a1a", color: "#00ff66" }}>
                  <tr>
                    <th>#</th>
                    <th>Likelihood</th>
                    <th>Technical Impact</th>
                    <th>Business Impact</th>
                    <th>Overall Risk</th>
                    <th>Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((item, index) => {
                    const formData = item.data || item; // ✅ handle both formats

                    const likelihood =
                      (formData.skillLevel +
                        formData.motive +
                        formData.opportunity +
                        formData.size +
                        formData.easeDiscovery +
                        formData.easeExploit +
                        formData.awareness +
                        formData.intrusionDetection) / 8;

                    const technicalImpact =
                      (formData.confidentiality +
                        formData.integrity +
                        formData.availability +
                        formData.accountability) / 4;

                    const businessImpact =
                      (formData.financial +
                        formData.reputation +
                        formData.privacy) / 3; // ✅ fixed divisor

                    const overallRisk = ((likelihood + technicalImpact + businessImpact) / 3).toFixed(2);

                    const riskLevel =
                      overallRisk >= 7 ? "High" : overallRisk >= 4 ? "Medium" : "Low";

                    return (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            riskLevel === "High"
                              ? "#330000"
                              : riskLevel === "Medium"
                              ? "#333300"
                              : "#003300",
                          color: "#dcdcdc",
                          fontWeight: "bold",
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{likelihood.toFixed(2)}</td>
                        <td>{technicalImpact.toFixed(2)}</td>
                        <td>{businessImpact.toFixed(2)}</td>
                        <td>{overallRisk}</td>
                        <td>{riskLevel}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between mt-3 flex-wrap gap-2">
                <Button
                  as={Link}
                  to="/assessment"
                  style={{ backgroundColor: "#00ff66", border: "none", color: "black" }}
                >
                  ➕ New Assessment
                </Button>
                <Button
                  onClick={() => {
                    localStorage.removeItem("history");
                    window.location.reload();
                  }}
                  style={{ backgroundColor: "#00ff66", border: "none", color: "black" }}
                >
                  🗑 Clear History
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default History;
