import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const ProcessGraph = ({ data, title }) => {
  const sortedData = [...data].sort((a, b) => b.step - a.step); // Step 10 to 1

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[300px] bg-white shadow-md rounded p-2 m-2">
        <h3 className="text-center font-semibold text-gray-600 mb-2">{title}</h3>
        <ResponsiveContainer width="100%" height={550}>
          <ComposedChart
            layout="vertical"
            data={sortedData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <XAxis type="number" domain={[0, 'dataMax + 50']} />
            <YAxis type="category" dataKey="step" />
            <Tooltip />
            <Bar dataKey="value" barSize={20} fill="rgba(106, 90, 205, 0.6)">
              <LabelList dataKey="value" position="right" fill="#333" />
            </Bar>
            <Line type="monotone" dataKey="value" stroke="#e60000" dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProcessGraph;
