
import React, { useState } from 'react';
import '../styles/Viewpopup.css'; 
import CancelPopup from './cancele';


const ViewPopup = ({ order, onClose,conform,orderId }) => {
  const [popup, setPopup] = useState(false)
  if (!order) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>Order Details</h2>
          <button className="popup-close" onClick={() => onClose(false)}>
            &times;
          </button>
        </div>

        <div className="popup-content">
          <div className='popup-content-head'>

            <p><strong>Order Id:</strong> {order.orderId}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Store:</strong> {order.location}</p>
            <p><strong>Phone:</strong> {order.storePhone}</p>
          </div>

          <hr />
          <div className='popup-content-body'>

          <p><strong>Order Items</strong></p>
            <ul >
              {order.items && order.items.map((item, idx) => (
                <li key={idx}>
                  {item}
                </li>
              ))}
            </ul>
       

          <hr />
       

            <p>Subtotal: {Number(order.price.replace('Rs ', '')) - 90}</p>
            <p>Pickup Charges: 90</p>
            <p><strong>Total: Rs {order.price}</strong></p>
          </div>
        </div>
        <div className='popup-cancel-btn'>

        <button onClick={()=>{
          setPopup(true)
        }}>Cancel order</button>
        </div>
      </div>
     {popup&& <CancelPopup setPopup={setPopup} conform={conform} orderId={orderId} />}
    </div>
  );
};

export default ViewPopup;
