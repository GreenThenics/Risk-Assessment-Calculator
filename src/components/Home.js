import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className="my-5">
      {/* Welcome Section */}
      <Card
        className="text-center shadow-lg p-4 mb-5"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#141414",
          border: "1px solid #00ff66",
          color: "#dcdcdc",
        }}
      >
        <Card.Body>
          <Card.Title
            className="mb-3 fs-3 fw-bold"
            style={{ color: "#00ff66", textShadow: "0 0 6px #00ff66" }}
          >
            Welcome to the Risk Assessment Toolkit
          </Card.Title>
          <Card.Text className="mb-4" style={{ color: "#a6a6a6" }}>
            This toolkit lets you evaluate risks using multiple methodologies:
            <br />
            <span style={{ color: "#00ff66" }}>OWASP</span>,{" "}
            <span style={{ color: "#00ff66" }}>CVSS v4</span>, and{" "}
            <span style={{ color: "#00ff66" }}>CVSS v3.1</span>.
          </Card.Text>

          {/* Three Options */}
          <Row className="g-3">
            <Col md={4}>
              <Button
                as={Link}
                to="/assessment"
                size="lg"
                className="w-100"
                style={{
                  backgroundColor: "#00ff66",
                  border: "none",
                  color: "black",
                }}
              >
                ▶ OWASP Risk Rating
              </Button>
            </Col>
            <Col md={4}>
              <Button
                as={Link}
                to="/cvss"
                size="lg"
                className="w-100"
                style={{
                  backgroundColor: "#00ff66",
                  border: "none",
                  color: "black",
                }}
              >
                ▶ CVSS v4 Calculator
              </Button>
            </Col>
            <Col md={4}>
              <Button
                as={Link}
                to="/cvss31"
                size="lg"
                className="w-100"
                style={{
                  backgroundColor: "#00ff66",
                  border: "none",
                  color: "black",
                }}
              >
                ▶ CVSS v3.1 Calculator
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Explanation Section */}
      <Row className="g-4">
        {/* OWASP */}
        <Col md={4}>
          <Card
            className="h-100 shadow-sm"
            style={{
              backgroundColor: "#0d0d0d",
              border: "1px solid #00ff66",
              color: "#dcdcdc",
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "#00ff66" }}>OWASP Risk Rating</Card.Title>
              <Card.Text style={{ fontSize: "0.9rem", color: "#a6a6a6" }}>
                The <strong>OWASP Risk Rating Methodology</strong> provides a
                structured way to assess risks by combining{" "}
                <em>threat agent factors, vulnerability factors, technical
                impact,</em> and <em>business impact</em>.  
                It is widely used in application security reviews.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* CVSS v3.1 */}
        <Col md={4}>
          <Card
            className="h-100 shadow-sm"
            style={{
              backgroundColor: "#0d0d0d",
              border: "1px solid #00ff66",
              color: "#dcdcdc",
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "#00ff66" }}>CVSS v3.1</Card.Title>
              <Card.Text style={{ fontSize: "0.9rem", color: "#a6a6a6" }}>
                <strong>Common Vulnerability Scoring System v3.1</strong> is an
                industry standard for rating the severity of vulnerabilities.  
                It evaluates <em>Base, Temporal,</em> and{" "}
                <em>Environmental</em> metrics to generate a severity score from
                0 to 10.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* CVSS v4.0 */}
        <Col md={4}>
          <Card
            className="h-100 shadow-sm"
            style={{
              backgroundColor: "#0d0d0d",
              border: "1px solid #00ff66",
              color: "#dcdcdc",
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "#00ff66" }}>CVSS v4.0</Card.Title>
              <Card.Text style={{ fontSize: "0.9rem", color: "#a6a6a6" }}>
                <strong>CVSS v4.0</strong> is the latest version, improving on
                v3.1 by refining scoring rules and introducing{" "}
                <em>Supplemental Metrics</em>.  
                It provides more accuracy for modern attack vectors, cloud, and
                distributed environments.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
