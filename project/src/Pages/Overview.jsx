import React, { useState } from "react";
import ProductionVolumeChart from "../components/overall/Productoverall";
import Filter from '../components/Monitoring/Filter';
import "../styles/overview.css"; 


const Production_Overview = () => {

  const [date, setDate] = useState('');
  const [product, setProduct] = useState('None');
  const [partNumber, setPartNumber] = useState('None');
  const [line, setLine] = useState('None');
  const [shift, setShift] = useState('None');
  const [process, setProcess] = useState('None');  

  const handleDateChange = (e) => setDate(e.target.value);
  const handleProductChange = (e) => setProduct(e.target.value);
  const handlePartChange = (e) => setPartNumber(e.target.value);
  const handleLineChange = (e) => setLine(e.target.value);
  const handleShiftChange = (e) => setShift(e.target.value);
  const handleProcessChange = (e) => setProcess(e.target.value);  

  const handleClearFilters = () => {
    setDate('');
    setProduct('None');
    setPartNumber('None');
    setLine('None');
    setShift('None');
    setProcess('None');  
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

        {/* Insert Chart Component Below */}
        <div className="Config">
            <ProductionVolumeChart />
        </div>

    </div>
  );
};

export default Production_Overview;
