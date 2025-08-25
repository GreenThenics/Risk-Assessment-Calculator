// src/utils/cvss.js
// Simplified CVSS v4.0 logic adapted from RedHat repo

export class Vector {
  constructor() {
    this.metrics = {};
    this.raw = "";
  }

  updateMetric(short, value) {
    this.metrics[short] = value;
    this.raw = Object.entries(this.metrics)
      .map(([k, v]) => `${k}:${v}`)
      .join("/");
  }
}

export class CVSS40 {
  constructor(vector) {
    this.vector = vector;
    this.score = 0;
    this.severity = "None";
  }

  calculateScore() {
    // ⚡ Simplified scoring formula
    // In the real repo it’s much more detailed
    const values = Object.values(this.vector.metrics);
    if (values.length === 0) {
      this.score = 0;
      this.severity = "None";
      return;
    }

    // assign numeric weight to letters (N=9, A=7, L=5, P=2 as example)
    const mapping = { N: 9, A: 7, L: 5, P: 2, H: 8, M: 5, L2: 2 };

    let total = 0;
    values.forEach((v) => {
      total += mapping[v] || 5; // default weight
    });

    this.score = Math.min(10, (total / values.length).toFixed(1));

    if (this.score >= 9) this.severity = "Critical";
    else if (this.score >= 7) this.severity = "High";
    else if (this.score >= 4) this.severity = "Medium";
    else if (this.score > 0) this.severity = "Low";
    else this.severity = "None";
  }
}
