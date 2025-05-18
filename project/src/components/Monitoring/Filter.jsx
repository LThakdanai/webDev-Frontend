import React from "react";
import "../../styles/Dashbord.css";

const FilterBar = ({
  date,
  product,
  partNumber,
  shift,
  process,
  onDateChange,
  onProductChange,
  onPartChange,
  onShiftChange,
  onProcessChange,
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-item">
        <label className="filter-label">Date</label>
        <input
          type="date"
          value={date}
          onChange={onDateChange}
          className="filter-input"
        />
      </div>

      <div className="filter-item">
        <label className="filter-label">Product</label>
        <select
          value={product}
          onChange={onProductChange}
          className="filter-input"
        >
          <option value="Banana">Gear</option>
          <option value="Apple">Apple</option>
        </select>
      </div>

      <div className="filter-item">
        <label className="filter-label">Part Number</label>
        <input
          type="text"
          value={partNumber}
          onChange={onPartChange}
          placeholder="e.g. PN-001"
          className="filter-input"
        />
      </div>

      <div className="filter-item">
        <label className="filter-label">Shift</label>
        <select value={shift} onChange={onShiftChange} className="filter-input">
          <option value="Shift 1">Day</option>
          <option value="Shift 2">Night</option>
        </select>
      </div>

      <div className="filter-item">
        <label className="filter-label">Process</label>
        <select
          value={process}
          onChange={onProcessChange}
          className="filter-input"
        >
          <option value="None">None</option>
          <option value="Process 1">Process A</option>
          <option value="Process 2">Process B</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
