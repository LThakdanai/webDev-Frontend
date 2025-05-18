import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext, DataProvider } from "../Datacontext";
import FilterBar from "../components/Dashbord/FilterBar";
import InfoCard from "../components/Dashbord/InfoCard";
import OEEChart from "../components/Dashbord/OEE";
import TaskChart from "../components/Dashbord/Task";
import CompareEfficiencyChart from "../components/Dashbord/Eff";
import "../styles/Dashbord.css";

const Dashboard = () => {
  const { productData, effStat, loading } = useContext(DataContext);

  const [date, setDate] = useState("2025-05-12");
  const [product, setProduct] = useState("Select");
  const [partNumber, setPartNumber] = useState("");
  const [shift, setShift] = useState("Select");

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const [plan, setPlan] = useState("");
  const [actual, setActual] = useState("");
  const [deflect, setDefect] = useState("");
  const [eff, setEff] = useState("");
  const [availability, setAvailability] = useState("");
  const [performance, setPerformance] = useState("");
  const [quality, setQuality] = useState("");

  const [steady, setLaunch] = useState(true);

  const [efficiencyData, setEfficiencyData] = useState([
    { name: "Line A", efficiency: 0 },
    { name: "Line B", efficiency: 0 },
    { name: "Line C", efficiency: 0 },
  ]);

  const data = [
    { name: "Performance", value: performance / 100 },
    { name: "Availability", value: availability / 100 },
    { name: "Quality", value: quality / 100 },
  ];

  const [taskData, setTimeData] = useState([
    { time: "08:00", plan: 5000, actual: 3000 },
    { time: "09:00", plan: 10000, actual: 7000 },
    { time: "10:00", plan: 15000, actual: 10000 },
    { time: "11:00", plan: 20000, actual: 12000 },
    { time: "12:00", plan: 25000, actual: 13000 },
    { time: "13:00", plan: 30000, actual: 17000 },
    { time: "14:00", plan: 35000, actual: 20000 },
    { time: "15:00", plan: 40000, actual: 25000 },
    { time: "16:00", plan: 45000, actual: 25000 },
    { time: "17:00", plan: 48000, actual: 25000 },
    { time: "18:00", plan: 50000, actual: 25000 },
    { time: "19:00", plan: 53000, actual: 30000 },
    { time: "20:00", plan: 57000, actual: 34000 },
    { time: "21:00", plan: 60000, actual: 35000 },
    { time: "22:00", plan: 64000, actual: 39000 },
    { time: "23:00", plan: 68000, actual: 44000 },
    { time: "00:00", plan: 72000, actual: 47000 },
    { time: "01:00", plan: 76000, actual: 50000 },
    { time: "02:00", plan: 80000, actual: 52000 },
    { time: "03:00", plan: 84000, actual: 53000 },
    { time: "04:00", plan: 88000, actual: 55000 },
    { time: "05:00", plan: 92000, actual: 58000 },
    { time: "06:00", plan: 96000, actual: 58000 },
    { time: "07:00", plan: 96000, actual: 58000 },
  ]);

  useEffect(() => {
    const fetchProduct = async (id, date_stamp) => {
      try {
        const url1 = `http://localhost:5431/api/today_plan/${id}/date/${date_stamp}`;
        const response1 = await fetch(url1);
        const result1 = await response1.json();
        setPlan(result1.data?.total_plan_sum || "Unknown");

        const url2 = `http://localhost:5431/api/actual/${id}/date/${date_stamp}`;
        const response2 = await fetch(url2);
        const result2 = await response2.json();
        setActual(result2.data?.total_actual_sum || "Unknown");

        const url3 = `http://localhost:5431/api/defect/${id}/date/${date_stamp}`;
        const response3 = await fetch(url3);
        const result3 = await response3.json();
        setDefect(result3.data?.total_defect_sum || "Unknown");

        const url4 = `http://localhost:5431/api/efficiency/${id}/date/${date_stamp}`;
        const response4 = await fetch(url4);
        const result4 = await response4.json();
        setEff(result4.data?.actualplan_percentage || "Unknown");

        const url6 = `http://localhost:5431/api/ava/${id}/date/${date_stamp}`;
        const response6 = await fetch(url6);
        const result6 = await response6.json();
        setAvailability(result6.data?.avg_ava || "Unknown");

        const url7 = `http://localhost:5431/api/performance/${id}/date/${date_stamp}`;
        const response7 = await fetch(url7);
        const result7 = await response7.json();
        setPerformance(result7.data?.avg_performance || "Unknown");

        const url8 = `http://localhost:5431/api/quality/${id}/date/${date_stamp}`;
        const response8 = await fetch(url8);
        const result8 = await response8.json();
        setQuality(result8.data?.avg_quality || "Unknown");
      } catch (err) {
        console.error(err.message);
        setPlan("Error");
        setActual("Error");
        setDefect("Error");
        setEff("Error");
        setAvailability("Error");
        setPerformance("Error");
        setQuality("Error");
      } finally {
        setLaunch(false);
      }
    };

    if (userId && date) {
      fetchProduct(userId, date);
    }
  }, [userId, date]);

  useEffect(() => {
    const fetchAllLines = async (id, date_stamp) => {
      const lines = ["A", "B", "C"];
      try {
        const updatedEffData = await Promise.all(
          lines.map(async (line) => {
            const url = `http://localhost:5431/api/lineEff/${id}/date/${date_stamp}/${line}`;
            const response = await fetch(url);
            const result = await response.json();
            const efficiency = result.data?.line_actualplan_percentage || 0;
            return { name: `Line ${line}`, efficiency };
          })
        );
        setEfficiencyData(updatedEffData);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLaunch(false);
      }
    };

    if (userId && date) {
      fetchAllLines(userId, date);
    }
  }, [userId, date]);

  useEffect(() => {
    const fetchPlanTime = async (id, date_stamp) => {
      try {
        const updatedTimeData = await Promise.all(
          taskData.map(async (timeEntry) => {
            const time_start = timeEntry.time + ":00";
            const nextHour =
              ("0" + (parseInt(timeEntry.time.split(":")[0], 10) + 1)).slice(
                -2
              ) + ":00:00";
            const url1 = `http://localhost:5431/api/plantime/${id}/date/${date_stamp}/time_start/${time_start}/time_end/${nextHour}`;
            const url2 = `http://localhost:5431/api/actualtime/${id}/date/${date_stamp}/time_start/${time_start}/time_end/${nextHour}`;

            const response1 = await fetch(url1);
            const response2 = await fetch(url2);
            const result1 = await response1.json();
            const result2 = await response2.json();

            const plan = result1.data?.sum_plan_by_time || 0;
            const actual = result2.data?.sum_actual_by_time || 0; // Adjust if your API returns actual too

            return {
              time: timeEntry.time,
              plan,
              actual,
            };
          })
        );
        setTimeData(updatedTimeData);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLaunch(false);
      }
    };

    if (userId && date) {
      fetchPlanTime(userId, date);
    }
  }, [userId, date]);

  {
    /* Token check */
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  {
    /* Check product data and Eff */
  }
  useEffect(() => {
    console.log("🚀 productData:", productData);
    console.log("🔎 effStat:", effStat);
  }, [productData, effStat]);

  // Filter ข้อมูล product และ eff
  const filteredProduct =
    productData &&
    productData.find(
      (p) =>
        p.product_number === product &&
        (!partNumber || p.part_number === partNumber)
    );

  const filteredEff =
    effStat &&
    effStat.find(
      (e) => e.product === product && e.time_stamp?.startsWith(date)
    );

  // ตรวจสอบค่าที่กรองแล้ว
  useEffect(() => {
    console.log("📊 filteredProduct:", filteredProduct);
    console.log("📊 filteredEff:", filteredEff);
  }, [filteredProduct, filteredEff]);

  // ถ้า productData มีข้อมูลไม่พอให้เลือก
  useEffect(() => {
    if (productData.length > 0) {
      setProduct(productData[0].product_number);
    }
  }, [productData]);

  return (
    <div className="px-4 md:px-8 py-4 flex flex-col">
      {/* Filter Bar */}
      <div className="mb-6">
        <FilterBar
          date={date}
          product={product}
          partNumber={partNumber}
          shift={shift}
          onDateChange={(e) => setDate(e.target.value)}
          onProductChange={(e) => setProduct(e.target.value)}
          onPartChange={(e) => setPartNumber(e.target.value)}
          onShiftChange={(e) => setShift(e.target.value)}
        />
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center text-gray-600">Loading data...</div>
      ) : (
        <DataProvider>
          {/* Info Cards  use ?.  */}
          <div className="flex flex-wrap gap-4 justify-center ">
            <InfoCard
              title="Today Plan"
              value={plan}
              unit="Pcs."
              change="0%"
              status="up"
            />
            <InfoCard
              title="Actual"
              value={actual}
              unit="Pcs."
              change="0%"
              status="down"
            />
            <InfoCard
              title="Defect"
              value={deflect}
              unit="Pcs."
              change="0%"
              status="down"
            />
            <InfoCard
              title="Down Time"
              value={filteredEff?.downtime || "60"}
              unit="min."
              change="0%"
              status="down"
            />
            <InfoCard
              title="Efficiency (%)"
              value={eff}
              unit="%"
              change="0%"
              status="up"
            />
          </div>

          {/* OEE % EFF */}
          <div className="flex justify-center gap-6 OEE_EFFcontain">
            {/* OEE Chart */}
            <div className="flex-1 min-w-[300px]">
              <OEEChart data={data} />
            </div>

            {/* Efficiency Chart */}
            <div className="flex-2 min-w-[300px] justifyitem-center">
              <CompareEfficiencyChart data={efficiencyData} />
            </div>
          </div>

          {/* Task Graph */}
          <div className="flex justify-center taskcontain">
            <TaskChart data={taskData} />
          </div>
        </DataProvider>
      )}
    </div>
  );
};

export default Dashboard;
