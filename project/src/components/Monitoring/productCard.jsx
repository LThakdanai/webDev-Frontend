import React from 'react';

const ProductCard = ({ number }) => {
  return (
    <div className="product-card">
      <div className="product-details">
        <div className="product-header">
          <strong>Product NO : {number}</strong>
          <span>P/N: ZG 1234</span>
          <span>Line: A</span>
          <span>CT: 3 Sec</span>
          <span>00:00:00</span>
          <span className="status-ok">OK</span>
        </div>

        <div className="product-process">
          {[1, 2, 3, 4, 5].map((proc, idx) => (
            <div key={proc} className="process-step">
              <div>Process {proc}</div>
              <div>{idx === 2 ? '1 Sec' : '0.5 Sec'}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="product-video-placeholder">800 × 450</div>
    </div>
  );
};

export default ProductCard;
