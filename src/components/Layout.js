import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import NavBar from './Navbar';
import OrdersSection from '../pages/OrdersSection';
import CreateOrderSection from '../pages/create';
import '../styles/layout.css';
import SuccessModal from '../pages/Success';
import { getToken } from '../AuthOPration';
import { useNavigate, useLocation } from 'react-router-dom';
yy
const Layout = () => {
   const URL = 'https://laundry-server-b7j6.onrender.com'||'http://localhost:8000';
  const [activeView, setActiveView] = React.useState('orders');
  const [orders, setOrders] = React.useState([]);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [name,setName]=useState('')

  const location = useLocation();

    const addOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
    setShowSuccess(true);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/create') {
      setActiveView('create');
    } else {
      setActiveView('orders');
    }
  }, [location.pathname]);
  useEffect(() => {
    const token = getToken('token');
    if (!token) {
      alert('User not logged in');
      navigate('/');
      return;
    }
    const fetchOrders = async () => {
      const token = getToken('token');
       if (!token) return;
      try {
        const res = await fetch(`${URL}/api/v1/order`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch');
        }

        setOrders(data.orders);
       
        
        setName(data.name)
      } catch (error) {
        console.log('Failed to fetch orders:', error);
      }
    };

    fetchOrders();

    
  }, [orders]);
 

  return (
    <div className="app-container">
      <div className="main-content">
        <NavBar name={name}/>
        <div className='mixed-container'>
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
          {activeView === 'orders' ? (
            <OrdersSection setActiveView={setActiveView} orders={orders} setOrder={addOrder} setShowSuccess={setShowSuccess}/>
          ) : (
            <CreateOrderSection setActiveView={setActiveView} addOrder={addOrder} />
          )}
          {showSuccess && (
            <SuccessModal onClose={() => setShowSuccess(false)} />
          )}
        </div>
        <div className="create-footer">
          2025 © Laundry
        </div>
      </div>
    </div>
  );
};
export default Layout;