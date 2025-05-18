import React, { useState, useEffect } from "react";
import ProcessGraph from "../components/cycle Time/ProcessGraph";
import Filter from "../components/Monitoring/Filter";
import "../styles/CycleTime.css";

const sampleData = [
  {
    step: 1,
    process1: 200,
    process2: 150,
    process3: 200,
    process4: 250,
    process5: 300,
    process6: 320,
    process7: 350,
  },
  {
    step: 2,
    process1: 120,
    process2: 170,
    process3: 210,
    process4: 260,
    process5: 320,
    process6: 330,
    process7: 360,
  },
  {
    step: 3,
    process1: 90,
    process2: 140,
    process3: 180,
    process4: 230,
    process5: 280,
    process6: 310,
    process7: 340,
  },
];
/*
const [ct1, setCt1] = useState(0);
const [ct2, setCt2] = useState(0);
const [ct3, setCt3] = useState(0);
const [ct4, setCt4] = useState(0);
const [ct5, setCt5] = useState(0);
const [ct6, setCt6] = useState(0);
const [ct7, setCt7] = useState(0);
useEffect(() => {
  const fetchProcess = async (id, date_stamp) => {
    try {
      const url1 = `http://localhost:5431/api/ctdata/${id}/date/${date_stamp}/time/${time_stamp}`;
      const response1 = await fetch(url1);
      const result1 = await response1.json();
      setCt1(result1.data?.ct1 || "Unknown");
      setCt2(result1.data?.ct2 || "Unknown");
      setCt3(result1.data?.ct3 || "Unknown");
      setCt4(result1.data?.ct4 || "Unknown");
      setCt5(result1.data?.ct5 || "Unknown");
      setCt6(result1.data?.ct6 || "Unknown");
      setCt7(result1.data?.ct7 || "Unknown");
    } catch (err) {
      console.error(err.message);
      setPlan("Error");
    } finally {
      setLaunch(false);
    }
  };

  if (userId && date) {
    fetchProcess(userId, date);
  }
}, [userId, date]); */

const CycleTime = () => {
  const [date, setDate] = useState("");
  const [product, setProduct] = useState("None");
  const [partNumber, setPartNumber] = useState("None");
  const [line, setLine] = useState("None");
  const [shift, setShift] = useState("None");
  const [process, setProcess] = useState("None");

  const handleDateChange = (e) => setDate(e.target.value);
  const handleProductChange = (e) => setProduct(e.target.value);
  const handlePartChange = (e) => setPartNumber(e.target.value);
  const handleLineChange = (e) => setLine(e.target.value);
  const handleShiftChange = (e) => setShift(e.target.value);
  const handleProcessChange = (e) => setProcess(e.target.value);

  const handleClearFilters = () => {
    setDate("");
    setProduct("None");
    setPartNumber("None");
    setLine("None");
    setShift("None");
    setProcess("None");
  };

  // 🧠 ดึงชื่อ process key จาก sampleData
  const processKeys = Object.keys(sampleData[0]).filter(
    (key) => key !== "step"
  );

  // 🧩 สร้างกราฟแต่ละอันจาก key
  const processList = processKeys.map((key, idx) => ({
    id: idx + 1,
    title: `Process ${idx + 1}`,
    data: sampleData.map((row) => ({
      step: row.step,
      value: row[key],
    })),
  }));

  return (
    <div className="px-6 flex flex-col p-[30px] bg-gray-100 min-h-screen">
      <div className="ml-6">
        <Filter
          date={date}
          product={product}
          partNumber={partNumber}
          shift={shift}
          line={line}
          process={process}
          onDateChange={handleDateChange}
          onProductChange={handleProductChange}
          onPartChange={handlePartChange}
          onShiftChange={handleShiftChange}
          onLineChange={handleLineChange}
          onProcessChange={handleProcessChange}
          onClearFilters={handleClearFilters}
        />
      </div>
      <div className="bg-transparent space-y-4 card">
        <div className="overflow-x-auto w-full container max-w-full overflow-hidden">
          <div className="inline-flex gap-4 min-w-max">
            {processList.map((proc) => (
              <ProcessGraph key={proc.id} data={proc.data} title={proc.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleTime;
