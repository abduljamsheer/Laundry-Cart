import React from 'react'
import '../styles/success.css'
const SuccessModal = ({ onClose }) => {
      return (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={onClose}>×</button>
            <div className="success-icon">✔</div>
            <h3>Your order is successfully.</h3>
            <p>You can track the delivery in the "Orders" section.</p>
            <button onClick={onClose}>Go to orders</button>
          </div>
        </div>
      );
    };
export default SuccessModal