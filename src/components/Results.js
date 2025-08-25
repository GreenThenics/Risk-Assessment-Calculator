import React from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Results() {
  const latest = JSON.parse(localStorage.getItem("latestAssessment"));

  if (!latest) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <Card
          className="shadow-lg p-5 text-center"
          style={{
            background: "linear-gradient(145deg, #141414, #1f1f1f)",
            borderRadius: "15px",
            color: "#dcdcdc",
          }}
        >
          <Card.Body>
            <Card.Title className="fw-bold fs-4 text-danger">
              ⚠ No Assessment Found
            </Card.Title>
            <Card.Text className="text-muted mb-4">
              Please complete a risk assessment first.
            </Card.Text>
            <Button
              as={Link}
              to="/assessment"
              style={{
                backgroundColor: "#00ff66",
                border: "none",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Start Assessment
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // ✅ Extract data object
  const formData = latest.data;

  // -------- CALCULATIONS --------
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
    (formData.financial + formData.reputation + formData.privacy) / 3; // ✅ fixed divisor

  const overallRisk = ((likelihood + technicalImpact + businessImpact) / 3).toFixed(2);

  const riskLevel =
    overallRisk >= 7 ? "High" : overallRisk >= 4 ? "Medium" : "Low";

  // -------- EXPORT FUNCTIONS --------
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("OWASP Risk Assessment Report", 14, 20);

    const tableData = [
      ["Likelihood", likelihood.toFixed(2)],
      ["Technical Impact", technicalImpact.toFixed(2)],
      ["Business Impact", businessImpact.toFixed(2)],
      ["Overall Risk", `${overallRisk} (${riskLevel})`],
    ];

    autoTable(doc, {
      startY: 40,
      head: [["Factor", "Value"]],
      body: tableData,
    });

    doc.save("owasp_risk_report.pdf");
  };

  const exportCSV = () => {
    const rows = [
      ["Category", "Score"],
      ["Likelihood", likelihood.toFixed(2)],
      ["Technical Impact", technicalImpact.toFixed(2)],
      ["Business Impact", businessImpact.toFixed(2)],
      ["Overall Risk", `${overallRisk} (${riskLevel})`],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "owasp_risk_report.csv";
    link.click();
  };

  const exportTXT = () => {
    const content = `
OWASP Risk Assessment Report
----------------------------
Likelihood: ${likelihood.toFixed(2)} / 9
Technical Impact: ${technicalImpact.toFixed(2)} / 9
Business Impact: ${businessImpact.toFixed(2)} / 9
Overall Risk: ${overallRisk} (${riskLevel})
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "owasp_risk_report.txt";
    link.click();
  };

  const exportJSON = () => {
    const data = {
      likelihood: likelihood.toFixed(2),
      technicalImpact: technicalImpact.toFixed(2),
      businessImpact: businessImpact.toFixed(2),
      overallRisk,
      riskLevel,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "owasp_risk_report.json";
    link.click();
  };

  // -------- UI --------
  return (
    <Container className="my-5">
      <Card
        className="shadow-lg border-0"
        style={{
          background: "linear-gradient(145deg, #0d0d0d, #1a1a1a)",
          border: "1px solid #00ff66",
          borderRadius: "15px",
          color: "#dcdcdc",
        }}
      >
        <Card.Body className="p-5">
          <Card.Title
            className="fs-3 fw-bold mb-4 text-center"
            style={{ color: "#00ff66" }}
          >
            📊 Risk Assessment Results
          </Card.Title>

          {/* Table */}
          <Table
            bordered
            responsive
            className="mb-4 text-center align-middle"
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
                <th>Category</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Likelihood</strong></td>
                <td>{likelihood.toFixed(2)} / 9</td>
              </tr>
              <tr>
                <td><strong>Technical Impact</strong></td>
                <td>{technicalImpact.toFixed(2)} / 9</td>
              </tr>
              <tr>
                <td><strong>Business Impact</strong></td>
                <td>{businessImpact.toFixed(2)} / 9</td>
              </tr>
              <tr
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
                <td>Overall Risk</td>
                <td>{overallRisk} ({riskLevel})</td>
              </tr>
            </tbody>
          </Table>

          {/* Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            <Button onClick={exportPDF} style={{ backgroundColor: "#00ff66", border: "none", color: "black" }}>
              ⬇️ Export PDF
            </Button>
            <Button onClick={exportCSV} style={{ backgroundColor: "#00ff66", border: "none", color: "black" }}>
              ⬇️ Export CSV
            </Button>
            <Button onClick={exportTXT} style={{ backgroundColor: "#00ff66", border: "none", color: "black" }}>
              ⬇️ Export TXT
            </Button>
            <Button onClick={exportJSON} style={{ backgroundColor: "#00ff66", border: "none", color: "black" }}>
              ⬇️ Export JSON
            </Button>
          </div>

          {/* Navigation */}
          <div className="d-flex justify-content-between mt-4">
            <Button as={Link} to="/assessment" style={{ backgroundColor: "#00ff66", border: "none", color: "black" }}>
              🔄 Recalculate
            </Button>
            <Button as={Link} to="/history" style={{ backgroundColor: "#00ff66", border: "none", color: "black" }}>
              📂 View History
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Results;
