import React, { useState, useEffect } from "react";
import Filter from "../components/Monitoring/Filter";
import VolumeChart from "../components/overview/Volume";
import ProductionVolumeChart from "../components/overview/ProductionVolumeChart";
import '../styles/overview.css';


export default function Overview() {
    const [date, setDate] = useState(null);
    const [product, setProduct] = useState("");
    const [partNumber, setPartNumber] = useState("");
    const [shift, setShift] = useState("");
    const [line, setLine] = useState("");
    const [process, setProcess] = useState("");
  
    const handleDateChange = (newDate) => setDate(newDate);
    const handleProductChange = (newProduct) => setProduct(newProduct);
    const handlePartChange = (newPartNumber) => setPartNumber(newPartNumber);
    const handleShiftChange = (newShift) => setShift(newShift);
    const handleLineChange = (newLine) => setLine(newLine);
    const handleProcessChange = (newProcess) => setProcess(newProcess);
    const handleClearFilters = () => {
      setDate(null);
      setProduct("");
      setPartNumber("");
      setShift("");
      setLine("");
      setProcess("");
    };
  
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
        <div className="config ">
          <VolumeChart />
          <div className="card">
          <ProductionVolumeChart />
          </div>

        </div>
      </div>
    );
  }
  
