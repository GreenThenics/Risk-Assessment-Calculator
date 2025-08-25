import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ResultsChart = ({ assessments, factorBreakdown }) => {
  const breakdownData = factorBreakdown
    ? Object.entries(factorBreakdown).map(([factor, value]) => ({
        name: factor,
        value,
      }))
    : [];

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Risk Score Trend */}
      <div className="p-4 bg-white rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">📈 Risk Score Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={assessments || []}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Factor Breakdown */}
      <div className="p-4 bg-white rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">🧩 Factor Breakdown</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={breakdownData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#10b981"
              label
            >
              {breakdownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#10b981", "#3b82f6", "#f59e0b", "#ef4444"][index % 4]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultsChart;
