import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../../styles/Dashbord.css";

const COLORS = ["#0f111a", "#475be8", "#e4e8f0"];

const OEEChart = ({ data = [] }) => {
  const finalOEE = Math.round(
    data.reduce((product, d) => product * d.value, 1) * 10000
  );

  const [animatedOEE, setAnimatedOEE] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 500; // 500ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(progress * finalOEE);
      setAnimatedOEE(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [finalOEE]);

  return (
    <div className="bg-white drop-shadow-lg OEEbg" style={{ width: 400 }}>
      <h2 className="text-lg font-semibold text-gray-600 mb-2 text-center OEEtext">
        Overall Equipment Effectiveness
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={120}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-[150px] left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-2xl font-bold">OEE</p>
        <p className="text-4xl font-extrabold text-red-500 drop-shadow">
          {animatedOEE} %
        </p>
      </div>
      <div className="mt-4 flex justify-around text-sm font-semibold">
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-[#0f111a] rounded-sm"></span>
          Performance
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-[#475be8] rounded-sm"></span>
          Availability
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-[#e4e8f0] rounded-sm"></span>
          Quality
        </div>
      </div>
    </div>
  );
};

export default OEEChart;
