import React, { useState } from 'react'

import '../styles/createsection.css'
import { getToken } from '../AuthOPration';
import { useNavigate } from 'react-router-dom'; 
// import Summary from '../components/Summary';
const CreateOrderSection = ({ setActiveView, addOrder }) => {
  //  const [isDisabled, setIsDisabled] = useState(true);
  const washTypePrices = {
    wash: 20,
    iron: 10,
    dry: 30,
    chemical: 50,
  };
  const [orderItems, setOrderItems] = React.useState([
    { type: 'Shirts', quantity: 0, washType: [], pricePerItem: 20, total: 0, imageurl: 'images/shirt.jpg' },
    { type: 'T Shirts', quantity: 0, washType: [], pricePerItem: 20, total: 0, imageurl: 'images/t-shirt.avif' },
    { type: 'Trousers', quantity: 0, washType: [], pricePerItem: 30, total: 0, imageurl: 'images/trouser.webp' },
    { type: 'Jeans', quantity: 0, washType: [], pricePerItem: 30, total: 0, imageurl: 'images/jeans.jpg' },
    { type: 'Boxers', quantity: 0, washType: [], pricePerItem: 20, total: 0, imageurl: 'images/sports.jpg' },
    { type: 'Joggers', quantity: 0, washType: [], pricePerItem: 100, total: 0, imageurl: 'images/joggers.avif' },
    { type: 'Others', quantity: 0, washType: [], pricePerItem: 50, total: 0, imageurl: 'images/others.jpg' },
  ]);
  const statusofWashing=["In Washing","Ready to pickup","In Ironing","Ready to deliver"];
  const calculateTotal = (item) => {
    const basePrice = item.pricePerItem * item.quantity;
    const washTypeCost = item.washType.reduce((sum, type) => sum + (washTypePrices[type] || 0), 0) * item.quantity;
    return basePrice + washTypeCost;
  };

  const handleQuantityChange = (index, value) => {
    const newItems = [...orderItems];
    newItems[index].quantity = Math.max(0, parseInt(value) || 0);
    newItems[index].total = calculateTotal(newItems[index]);
    setOrderItems(newItems);
  };
  const [showSummary, setShowSummary] = React.useState(false);
  // const [selectedAddress, setSelectedAddress] = React.useState('Home');
  const [storeLocation, setStoreLocation] = React.useState('Jp Nagar');

  const handleWashType = (index, type) => {
    const newItems = [...orderItems];
    const currentTypes = newItems[index].washType;
    if (currentTypes.includes(type)) {
      newItems[index].washType = currentTypes.filter((t) => t !== type);
    } else {
      newItems[index].washType.push(type);
    }
    newItems[index].total = calculateTotal(newItems[index]);
    setOrderItems(newItems);
  };
  const handleReset = (index) => {
    const newItems = [...orderItems];
    newItems[index].quantity = 0;
    newItems[index].washType = [];
    newItems[index].total = 0;
    setOrderItems(newItems);
  };


  const handleProceed = () => {
    const hasItems = orderItems.some((item) => item.quantity > 0);
    if (hasItems) {
      setShowSummary(true);
    } else {
      alert('Please add at least one item to proceed.');
    }
  };

  const today = new Date();
  const date = today.toLocaleDateString();
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;
  const output = `${date},${time}`;
  const navigate=useNavigate()
 
  const selectedItems = orderItems
  .filter(item => item.quantity > 0)
  .map(item => item.type);
  const handleConfirm = async() => {
    const newOrder = {
      orderId: `OR00${Math.floor(Math.random() * 1000)}`,
      date: output,
      location: storeLocation,
      city: 'Bangalore',
      storePhone: getPhoneNumber(storeLocation),
      totalItems: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      price: `Rs ${orderItems.reduce((sum, item) => sum + item.total, 0) + 90}`,
      status: statusofWashing[Math.floor(Math.random() * 4)],
       items: selectedItems
    };
    const token = getToken('token');
    if (!token) {
      alert('You need to login first.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newOrder),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      addOrder(newOrder);  // Add order locally after success
      setShowSummary(false);
      setActiveView('orders');

    } catch (error) {
      alert(`Error creating order: ${error.message}`);
      if(error.message=='Invalid token'){
        navigate('/')
      }
    }
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const pickupCharges = 90;
  const total = subtotal + pickupCharges;
  const getPhoneNumber = (storeLocation) => {
    switch (storeLocation) {
      case 'Jp Nagar':
        return '9988697755';
      case 'Whitefield':
        return '9845012345';
      case 'Indiranagar':
        return '9900278901';
      case 'RT Nagar':
        return '9741122334';
      case 'Jayanagar':
        return '9611998877';
      default:
        return '';
    }
  };
  return (
    <div className="create-order-section">
      <div className="orders-header">
        <h2>Create Order</h2>
        <div>

          <input type="text" className="search-bar" />
        </div>
      </div>
      <table className="create-order-table">
        <thead>
          <tr>
            <th>Product Types</th>
            <th>Quantity</th>
            <th>Wash Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item, index) => (
            <tr key={item.type}>
              <td>
                <img src={item.imageurl}  alt={item.type} />
                {item.type}
                <p>Any color, print type and material</p>
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </td>
              <td>
                <div className="wash-type">
                  <button
                    className={item.washType.includes('wash') ? 'active' : ''}
                    onClick={() => handleWashType(index, 'wash')}
                  >
                    <img src='images/washing-machine.svg' className="wash-img" alt='washingmachine' />
                  </button>
                  <button
                    className={item.washType.includes('iron') ? 'active' : ''}
                    onClick={() => handleWashType(index, 'iron')}
                  >
                    <img src='images/ironing.svg' className="wash-img" alt='ironing' />
                  </button>
                  <button
                    className={item.washType.includes('dry') ? 'active' : ''}
                    onClick={() => handleWashType(index, 'dry')}
                  >
                    <img src='images/towel.svg' className="wash-img" alt='towel/svg' />
                  </button>
                  <button
                    className={item.washType.includes('chemical') ? 'active' : ''}
                    onClick={() => handleWashType(index, 'chemical')}
                  >
                    <img src='images/bleach.svg' className="wash-img" alt='bleach/svg' />
                  </button>
                </div>
              </td>
              <td className='price-data'>
                {/* {item.total > 0 ? `${item.quantity} x ${item.pricePerItem} = ${item.total}` : '--'}
                {item.quantity > 0 && (
                  <button className="reset-btn" onClick={() => handleReset(index)}>
                    Reset
                  </button>
                )} */}
                <div className="price-breakdown">
                  {item.total > 0 ? (
                    <>
                      <span>{item.quantity} x {item.pricePerItem} = {item.pricePerItem * item.quantity}</span>
                      <span>Total: ₹{item.total}</span>
                    </>
                  ) : (
                    '--'
                  )}
                  {item.quantity > 0 && (
                    <button className="reset-btn" onClick={() => handleReset(index)}>
                      Reset
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="action-buttons">
        <button className="cancel-btn" onClick={() => setActiveView('orders')}>
          Cancel
        </button>
        <button className="proceed-btn" onClick={handleProceed}>
          Proceed
        </button>
      </div>



      {showSummary && (
        <div className="modal-overlay">
          <div className="summary-modal">
            <button className="close-btn" onClick={() => setShowSummary(false)}>×</button>
            <h3>Summary</h3>
            <div className="store-info">
              <select
                value={storeLocation}
                onChange={(e) => setStoreLocation(e.target.value)}
              >
                <option value="Jp Nagar">Jp Nagar</option>
                <option value="Whitefield">Whitefield</option>
                <option value="Indiranagar">Indiranagar</option>
                <option value="RT Nagar">RT Nagar</option>
                <option value="Jayanagar">Jayanagar</option>
              </select>
              <div>
                <strong>Store Address:</strong>{((storeLocation == 'Jp Nagar') ? 'Near Phone booth, 10th road, Jp Nagar'
                  : (storeLocation == 'Whitefield') ? '#24, 2nd Cross, ITPL Main Road, Whitefield, Bengaluru'
                    : (storeLocation == 'Indiranagar') ? '#12, 7th Main, HAL 2nd Stage, Indiranagar, Bangalore'
                      : (storeLocation == 'RT Nagar') ? '#15, 2nd Cross, RT Nagar Main Road, RT Nagar, Bangalore'
                        : (storeLocation == 'Jayanagar') ? '#122, 9th Main, 3rd Block, Jayanagar, Bangalore' : '')}
                <br />
                <strong>Phone:</strong>
                <strong>Phone:</strong> {getPhoneNumber(storeLocation)}
              </div>
            </div>
            <table className="order-details">
              <tbody>
                {orderItems
                  .filter((item) => item.quantity > 0)
                  .map((item) => (
                    <tr key={item.type}>
                      <td>{item.type}</td>
                      <td>{item.washType.join(', ')}</td>
                      <td>{item.quantity} x {item.pricePerItem} = {item.total}</td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan="2">Sub total:</td>
                  <td>{subtotal}</td>
                </tr>
                <tr>
                  <td colSpan="2">Pickup Charges:</td>
                  <td>{pickupCharges}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="total">
                    TOTAL: Rs {total}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <div className="address-options">
              <div
                className={`address-option ${selectedAddress === 'Home' ? 'selected' : ''}`}
                onClick={() => setSelectedAddress('Home')}
              >
                <strong>Home</strong>
                <p>#223, 10th road, Jp Nagar, Bangalore</p>
              </div>
              <div
                className={`address-option ${selectedAddress === 'Other' ? 'selected' : ''}`}
                onClick={() => setSelectedAddress('Other')}
              >
                <strong>Other</strong>
                <p>#223, 10th road, Jp Nagar, Bangalore</p>
              </div>
              <div className="address-option">
                <span className="add-new">ADD NEW</span>
              </div>
            </div> */}
            <button onClick={handleConfirm}>Confirm</button>
          </div>
        </div>

      )}
    </div>
  );
};


export default CreateOrderSection;
