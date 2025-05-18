import React from "react";
import '../../styles/Dashbord.css'; 
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const TaskChart = ({ data }) => {
  return (
    <div className="bg-white drop-shadow-lg w-full max-w-full container" style={{ height: 300 }}>
      <h2 className="text-xl font-semibold text-gray-600 mb-2 ">
        Task Completion with Plan & Actual
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100000]} />
          <Tooltip />
          <Legend />
          
          {/* First render the lines for plan and actual */}
          <Line
            type="monotone"
            dataKey="plan"
            stroke="red"
            strokeWidth={3}
            dot={{ fill: "white", stroke: "red", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="blue"
            strokeWidth={3}
            dot={{ fill: "white", stroke: "blue", strokeWidth: 2 }}
          />
          
          {/* Render the Target line after the others */}
          <ReferenceLine
            y={60000}
            stroke="limegreen"
            strokeWidth={3}
            label={{
              value: "Target 60000",
              fill: "limegreen",
              position: "top",  // Position label above the line
              offset:10, // Move label slightly upwards for better visibility
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskChart;
