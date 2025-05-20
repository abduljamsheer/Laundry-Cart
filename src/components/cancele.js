import React from 'react';
import '../styles/CancelPopup.css';

const CancelPopup = ({ orderId, onClose, conform,setPopup }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>Alert</h2>
          <button className="popup-close" onClick={()=>{
            setPopup(false)
          }}>&times;</button>
        </div>

        <div className="popup-content">
          <span className="popup-icon">⚠️</span>
          <p>
            Are you sure you want to cancel the order No: <span className="popup-order-id">{orderId}</span>
          </p>
        </div>

        <div className="popup-footer">
          <button className="popup-proceed" onClick={conform}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPopup;
