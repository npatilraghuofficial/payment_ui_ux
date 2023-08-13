import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function MonthlySpendingGraph({ monthlySpendingPattern }) {
  const data = Object.entries(monthlySpendingPattern).map(([month, amount]) => ({
    month,
    amount,
  }));

  return (
    <BarChart width={300} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="amount" fill="#8884d8" />
    </BarChart>
  );
}

export default MonthlySpendingGraph;
