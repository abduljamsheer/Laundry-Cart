import React, { useEffect, useState } from 'react'
import '../styles/ordersection.css'
import CancelPopup from '../components/cancele';
import { Eye } from 'lucide-react'
import { getToken } from '../AuthOPration'
import ViewPopup from '../components/ViewPopup';
const OrdersSection = ({ setActiveView, orders, setOrder }) => {
   const URL = process.env.REACT_APP_API_URL ||'http://localhost:8000';
  const [popup, setPopup] = useState(false)
  const [view, setView] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const handleConfirmCancel = async () => {
    try {
      const token = getToken('token');
      const res = await fetch(`${URL}/api/v1/order/${selectedOrderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to delete order');
      setPopup(false);
    } catch (error) {
      console.error('Delete error:', error);
      alert('Could not delete order');
    }
  };

  const filteredOrders = orders.filter(order =>
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.location && order.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  return (
    <div className="orders-section">
      <div className="orders-header">
        <h2>Orders | {orders.length}</h2>
        <div className='btn-search'>
          {orders.length !== 0 && <button
            className="create-btn"
            onClick={() => setActiveView('create')}
          >
            CREATE
          </button>
          }
          <input
            type="text"
            className="search-bar"
            placeholder="Search by Order ID "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {orders.length === 0 ? (
        <div className='center-items'>
          <p className='empty-order'>No orders available</p>
          <button
            className="main-btn"
            onClick={() => setActiveView('create')}
          >
            CREATE
          </button></div>
      ) : (                                              
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Order Date & Time</th>
              <th>Store Location</th>
              <th>City</th>
              <th>Store Phone</th>
              <th>Total Items</th>
              <th>Price</th>
              <th>Status</th>
              <th>View</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.date}</td>
                <td>{order.location}</td>
                <td>{order.city}</td>
                <td>{order.storePhone}</td>
                <td>{order.totalItems}</td>
                <td>{order.price}</td>
                <td>
                  <span>
                    {order.status}
                  </span>
                </td>
                <td>
                  <span className="action-btn" onClick={() => {
                    setView(true)
                     setSelectedOrderId(order.orderId);
                  }}>
                    <Eye />
                  </span>
                </td>
                <td>
                  {(order.status === 'Ready to pickup' || order.status === 'Ready to deliver') && <span className='trash-cancel' onClick={() => {
                    setSelectedOrderId(order.orderId);
                    setPopup(true)
                  }} >
                    cancele order
                  </span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      )}
      {popup && <CancelPopup setPopup={setPopup} conform={handleConfirmCancel} orderId={selectedOrderId} />}
      {view && selectedOrderId && (
        <ViewPopup
          onClose={setView}
          order={orders.find(order => order.orderId === selectedOrderId)}
          conform={handleConfirmCancel} orderId={selectedOrderId}
        />
      )}
    </div>
  );
};


export default OrdersSection

