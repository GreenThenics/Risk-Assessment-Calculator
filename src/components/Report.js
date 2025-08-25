import React from "react";
import { Button, Container, Card } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Report() {
  const latestAssessment = JSON.parse(localStorage.getItem("latestAssessment"));

  const generatePDF = () => {
    if (!latestAssessment) {
      alert("⚠ No assessment found to generate report.");
      return;
    }

    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 255, 102);
    doc.text("OWASP Risk Assessment Report", 14, 20);

    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text("Generated Report of Latest Assessment", 14, 30);

    // Table
    const tableData = Object.entries(latestAssessment).map(([key, value]) => [
      key,
      value,
    ]);

    doc.autoTable({
      startY: 40,
      head: [["Factor", "Value"]],
      body: tableData,
      styles: { halign: "center" },
      headStyles: { fillColor: [0, 255, 102], textColor: 0, fontStyle: "bold" },
      bodyStyles: { fillColor: [20, 20, 20], textColor: 255 },
      alternateRowStyles: { fillColor: [40, 40, 40] },
    });

    // Save
    doc.save("owasp_risk_report.pdf");
  };

  return (
    <Container className="my-5">
      <Card
        className="shadow-lg border-0"
        style={{
          background: "linear-gradient(145deg, #0d0d0d, #1a1a1a)",
          border: "1px solid #00ff66",
          color: "#dcdcdc",
          borderRadius: "15px",
        }}
      >
        <Card.Body className="text-center p-5">
          <Card.Title
            className="mb-4"
            style={{ color: "#00ff66", fontSize: "1.6rem", fontWeight: "bold" }}
          >
            📄 Risk Assessment Report
          </Card.Title>
          {latestAssessment ? (
            <Button
              style={{
                backgroundColor: "#00ff66",
                border: "none",
                color: "black",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px #00ff66",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.boxShadow = "0px 0px 20px #00ff66")}
              onMouseOut={(e) => (e.target.style.boxShadow = "0px 0px 10px #00ff66")}
              onClick={generatePDF}
            >
              ⬇️ Download PDF Report
            </Button>
          ) : (
            <p style={{ color: "#a6a6a6" }}>No assessment available.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Report;
