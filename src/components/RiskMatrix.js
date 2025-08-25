import React from "react";

function RiskMatrix({ likelihood, impact }) {
  return (
    <div className="mt-4">
      <h5>Risk Matrix</h5>
      <p>(For simplicity, you can later replace this with a heatmap grid or chart)</p>
      <p>Likelihood: {likelihood}, Impact: {impact}</p>
    </div>
  );
}

export default RiskMatrix;
