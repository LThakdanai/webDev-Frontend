import React, { useState } from "react";
import Filter from "../components/Monitoring/Filter";
import "../styles/monitoring.css";
import CameraFeed from "../components/Monitoring/Camera";
import ProductCard from "../components/Monitoring/productCard";

const Monitoring = () => {
  // Filter states
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
    setCurrentPage(1);
  };

  // Mock data
  const products = [
    {
      id: 1,
      pn: "ZG1234",
      line: "A",
      shift: "Shift 1",
      product: "Gear",
      process: "Process A",
    },
    {
      id: 2,
      pn: "ZG2264",
      line: "B",
      shift: "Shift 2",
      product: "Apple",
      process: "Process B",
    },
    {
      id: 3,
      pn: "ZG1234",
      line: "A",
      shift: "Shift 1",
      product: "Gear",
      process: "Process C",
    },
    {
      id: 4,
      pn: "ZG2264",
      line: "B",
      shift: "Shift 2",
      product: "Apple",
      process: "Process A",
    },
    {
      id: 5,
      pn: "ZG1234",
      line: "A",
      shift: "Shift 1",
      product: "Gear",
      process: "Process B",
    },
    {
      id: 6,
      pn: "ZG2264",
      line: "B",
      shift: "Shift 2",
      product: "Apple",
      process: "Process C",
    },
  ];

  const filteredProducts = products.filter((p) => {
    return (
      (product === "None" || p.product === product) &&
      (partNumber === "None" || p.pn === partNumber) &&
      (line === "None" || p.line === line) &&
      (shift === "None" || p.shift === shift) &&
      (process === "None" || p.process === process)
    );
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="px-6 flex flex-col p-[30px] bg-gray-100 min-h-screen overflow-hidden">
      {" "}
      {/* ใส่ overflow-hidden ที่นี่ */}
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
      <div className="flex justify-between gap-6 mt-4">
        {/* Camera Section */}
        <div className="flex-[1.3] min-w-[300px]">
          <CameraFeed />
        </div>

        {/* Pagination Controls */}
        <div className="flex-[1.7] min-w-[500px]">
          <div
            className="pmbg bg-white p-4 rounded shadow "
            style={{ maxHeight: "640px" }}
          >
            {/* หัวข้อ Fix อยู่ด้านบน */}
            <h3 className="text-xl font-semibold mb-4 bg-white sticky top-0 z-10 pt-2 pb-2 text">
              Monitoring Product
            </h3>

            {/* Scroll section - limit to 3 card height */}
            <div
              className="overflow-y-auto space-y-4 card"
              style={{ maxHeight: "500px" }}
            >
              {filteredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className={`relative ${idx >= 3 ? "z-0" : "z-10"}`} // ใส่ z-index ตามลำดับ
                >
                  <ProductCard number={product.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
