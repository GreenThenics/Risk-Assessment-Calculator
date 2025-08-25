// src/utils/cvss31.js
// Adapted CVSS v3.1 scoring logic

export const CVSS31 = {
  calculateCVSSFromMetrics: function (
    AV, AC, PR, UI, S, C, I, A, E, RL, RC, CR, IR, AR,
    MAV, MAC, MPR, MUI, MS, MC, MI, MA
  ) {
    try {
      // --- Numerical values as per CVSS v3.1 specification ---
      const metricWeights = {
        AV: { N: 0.85, A: 0.62, L: 0.55, P: 0.2 },
        AC: { L: 0.77, H: 0.44 },
        PR: {
          U: { N: 0.85, L: 0.62, H: 0.27 },
          C: { N: 0.85, L: 0.68, H: 0.5 }
        },
        UI: { N: 0.85, R: 0.62 },
        S: { U: "U", C: "C" },
        C: { N: 0.0, L: 0.22, H: 0.56 },
        I: { N: 0.0, L: 0.22, H: 0.56 },
        A: { N: 0.0, L: 0.22, H: 0.56 },
      };

      // Exploitability
      const exploitability =
        8.22 *
        metricWeights.AV[AV] *
        metricWeights.AC[AC] *
        (PR ? metricWeights.PR[S][PR] : 1) *
        metricWeights.UI[UI];

      // Impact
      const impactSub =
        1 -
        (1 - metricWeights.C[C]) *
        (1 - metricWeights.I[I]) *
        (1 - metricWeights.A[A]);

      let impact = 0;
      if (S === "U") {
        impact = 6.42 * impactSub;
      } else if (S === "C") {
        impact = 7.52 * (impactSub - 0.029) - 3.25 * Math.pow(impactSub - 0.02, 15);
      }

      // Base score
      let baseScore = 0;
      if (impact <= 0) {
        baseScore = 0;
      } else if (S === "U") {
        baseScore = Math.min(impact + exploitability, 10);
      } else {
        baseScore = Math.min(1.08 * (impact + exploitability), 10);
      }
      baseScore = Math.ceil(baseScore * 10) / 10.0; // round up

      // Severity rating
      let severity = "None";
      if (baseScore >= 9.0) severity = "Critical";
      else if (baseScore >= 7.0) severity = "High";
      else if (baseScore >= 4.0) severity = "Medium";
      else if (baseScore > 0) severity = "Low";

      return {
        success: true,
        baseMetricScore: baseScore,
        baseSeverity: severity,
        vectorString: `CVSS:3.1/AV:${AV}/AC:${AC}/PR:${PR}/UI:${UI}/S:${S}/C:${C}/I:${I}/A:${A}`
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
