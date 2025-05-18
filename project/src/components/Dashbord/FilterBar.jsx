import React from "react";

const FilterBar = ({
  date,
  product,
  partNumber,
  shift,
  onDateChange,
  onProductChange,
  onPartChange,
  onShiftChange,
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
          <option value="">Select</option>
          <option value="Gear">Gear</option>
          <option value="Wheel">Wheel</option>
          <option value="Roof">Roof</option>
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
          <option value="">Select</option>
          <option value="Shift 1">Day</option>
          <option value="Shift 2">Night</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
