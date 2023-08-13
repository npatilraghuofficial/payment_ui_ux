import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

function VisualGraph() {
  const [graphData, setGraphData] = useState({
    averageTransactionAmount: 250,
    highestTransactionAmount: 1000,
    lowestTransactionAmount: 50,
    transactionSuccessRate: 85,
    availableCredit: 1500,
  });

  useEffect(() => {
    // Fetch data from your API or data source here
    // For demonstration purposes, I'm using placeholder values
    const fetchedData = {
      averageTransactionAmount: 300,
      highestTransactionAmount: 1200,
      lowestTransactionAmount: 70,
      transactionSuccessRate: 78,
      availableCredit: 1800,
    };

    setGraphData(fetchedData);
  }, []);

  const successRateData = [
    { name: "Success Rate", value: graphData.transactionSuccessRate },
    { name: "Failure Rate", value: 100 - graphData.transactionSuccessRate },
  ];

  const COLORS = ["#8884d8", "#82ca9d"];

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="graph-container">
        <div className="bar-chart">
          <h2>Transaction Analysis</h2>
          <BarChart width={200} height={200} data={[graphData]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="attribute" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="averageTransactionAmount" fill="#8884d8" name="Average" />
            <Bar dataKey="highestTransactionAmount" fill="#82ca9d" name="Highest" />
            <Bar dataKey="lowestTransactionAmount" fill="#ff7300" name="Lowest" />
          </BarChart>
        </div>
        <div className="pie-chart">
          <h2>Transaction Success Rate</h2>
          <PieChart width={350} height={350}>
            <Pie
              data={successRateData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={(entry) => entry.name}
            >
              {successRateData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default VisualGraph;
