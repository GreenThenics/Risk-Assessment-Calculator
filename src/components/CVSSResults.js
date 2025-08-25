// src/components/CVSSResults.js
import React from 'react';
import { Card, Container } from 'react-bootstrap';

function CVSSResults({ result }) {
  if (!result) return null;

  return (
    <Container className="my-4">
      <Card
        className="shadow-lg border-0"
        style={{
          background: 'linear-gradient(145deg, #0d0d0d, #1a1a1a)',
          border: '1px solid #00ff66', borderRadius: '15px', color: '#dcdcdc'
        }}
      >
        <Card.Body className="text-center">
          <Card.Title style={{ color: '#00ff66' }}>CVSS v4 Results</Card.Title>
          <p>Vector: <code>{result.vector}</code></p>
          <p>
            Score: <strong>{result.score}</strong> — <em>{result.severity}</em>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CVSSResults;
