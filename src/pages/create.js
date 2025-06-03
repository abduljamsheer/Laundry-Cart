import React, { useState } from 'react'

import '../styles/createsection.css'
import { getToken } from '../AuthOPration';
import { useNavigate } from 'react-router-dom';
import AddressSelector from '../components/AddressSelector';
const CreateOrderSection = ({ setActiveView, addOrder }) => {
  const URL = 'https://laundry-server-b7j6.onrender.com'||'http://localhost:8000';
  const [showSummary, setShowSummary] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState('Home');
  const [storeLocation, setStoreLocation] = React.useState('Jp Nagar');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [Address, setAddress] = useState('')
  const [orderItems, setOrderItems] = React.useState([
    { type: 'Shirts', quantity: 0, washType: [], pricePerItem: 20, total: 0, imageurl: 'images/shirt.jpg' },
    { type: 'tshirts', quantity: 0, washType: [], pricePerItem: 20, total: 0, imageurl: 'images/t-shirt.avif' },
    { type: 'Trousers', quantity: 0, washType: [], pricePerItem: 30, total: 0, imageurl: 'images/trouser.webp' },
    { type: 'Jeans', quantity: 0, washType: [], pricePerItem: 30, total: 0, imageurl: 'images/jeans.jpg' },
    { type: 'Boxers', quantity: 0, washType: [], pricePerItem: 20, total: 0, imageurl: 'images/sports.jpg' },
    { type: 'Joggers', quantity: 0, washType: [], pricePerItem: 100, total: 0, imageurl: 'images/joggers.avif' },
    { type: 'Others', quantity: 0, washType: [], pricePerItem: 50, total: 0, imageurl: 'images/others.jpg' },
  ]);
  const statusofWashing = ["In Washing", "Ready to pickup", "In Ironing", "Ready to deliver"];
  const washPrices = {
    shirts: { wash: 10, iron: 10, bleach: 15, dry: 20, chemical: 50 },
    tshirts: { wash: 10, iron: 10, bleach: 15, dry: 20, chemical: 50 },
    trousers: { wash: 15, iron: 10, bleach: 20, dry: 25, chemical: 50 },
    jeans: { wash: 15, iron: 10, bleach: 20, dry: 25, chemical: 50 },
    boxers: { wash: 15, iron: 10, bleach: 20, dry: 25, chemical: 50 },
    joggers: { wash: 15, iron: 10, bleach: 20, dry: 25, chemical: 50 },
    others: { wash: 15, iron: 10, bleach: 20, dry: 25, chemical: 50 },
  };
  const calculateTotal = (item) => {
    if (!item || !item.type) return 0;

    const itemKey = item.type.toLowerCase(); 
    const prices = washPrices[itemKey] || {};
    const washCost = item.washType.reduce(
      (sum, type) => sum + (prices[type] || 0),
      0
    );
    return item.quantity * washCost;
  };

  const handleQuantityChange = (index, value) => {
    const newItems = [...orderItems];
    newItems[index].quantity = Math.max(0, parseInt(value) || 0);
    newItems[index].total = calculateTotal(newItems[index]);
    setOrderItems(newItems);
  };


  const handleWashType = (index, type) => {
    const newItems = [...orderItems];
    const item = newItems[index];

    if (item.washType.includes(type)) {
      item.washType = item.washType.filter((t) => t !== type);
    } else {
      item.washType.push(type);
    }

    item.total = item.washType.length > 0 ? calculateTotal(item) : 0;
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
const phoneNumbers = {
  'Jp Nagar': '9988697755',
  'Whitefield': '9845012345',
  'Indiranagar': '9900278901',
  'RT Nagar': '9741122334',
  'Jayanagar': '9611998877'
};
const getPhoneNumber = (storeLocation) => {
  return phoneNumbers[storeLocation] || '';
};
  const today = new Date();
  const date = today.toLocaleDateString();
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;
  const output = `${date},${time}`;
  const navigate = useNavigate()

  let finalAddress = '';

  if (selectedAddress === 'Home') {
    finalAddress = 'Home: #223, 10th road, Jp Nagar, Bangalore';
  } else if (selectedAddress === 'Other') {
    finalAddress = 'Other: #223, 10th road, Jp Nagar, Bangalore';
  } else if (selectedAddress === 'new' && Address) {
    finalAddress = `${Address.label}: ${Address.street}, ${Address.city}, ${Address.state}`;
  }
  const selectedItems = orderItems
    .filter(item => item.quantity > 0)
    .map(item => item.type);
  const handleConfirm = async () => {
    const newOrder = {
      orderId: `OR00${Math.floor(Math.random() * 1000)}`,
      date: output,
      location: storeLocation,
      city: 'Bangalore',
      storePhone: getPhoneNumber(storeLocation),
      totalItems: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      price: `Rs ${orderItems.reduce((sum, item) => sum + item.total, 0) + 90}`,
      status: statusofWashing[Math.floor(Math.random() * 4)],
      items: selectedItems,
      address:finalAddress
    };
    const token = getToken('token');
    if (!token) {
      alert('You need to login first.');
      return;
    }

    try {
      const response = await fetch(`${URL}/api/v1/order`, {
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

      addOrder(newOrder);
      setShowSummary(false);
      setActiveView('orders');

    } catch (error) {
      alert(`Error creating order: ${error.message}`);
      if (error.message == 'Invalid token') {
        navigate('/')
      }
    }
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const pickupCharges = 90;
  const total = subtotal + pickupCharges;
  // const getPhoneNumber = (storeLocation) => {
  //   switch (storeLocation) {
  //     case 'Jp Nagar':
  //       return '9988697755';
  //     case 'Whitefield':
  //       return '9845012345';
  //     case 'Indiranagar':
  //       return '9900278901';
  //     case 'RT Nagar':
  //       return '9741122334';
  //     case 'Jayanagar':
  //       return '9611998877';
  //     default:
  //       return '';
  //   }
  // };
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
                <img src={item.imageurl} alt={item.type} />
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
               
                <div className="price-breakdown">
                  
                  {item.quantity > 0 && item.washType.length > 0 ? (
                    <>
                      <span>{item.quantity} x {calculateTotal(item) / item.quantity} =  <b>₹{item.total}</b></span>
                 
                      <button className="reset-btn" onClick={() => handleReset(index)}>
                        Reset
                      </button>
                    </>
                  ) : (
                    '--'
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
        <div className="summary-modal-overlay">
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
            <div>
              <strong>Address</strong>

            </div>
            <div className="address-options">

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
              {Address?<div 
              className={`address-option ${selectedAddress === 'new' ? 'selected' : ''}`} 
              onClick={() => setSelectedAddress('new')}
              >
               <strong>{Address.label}</strong>
               <p>{Address.street},{Address.city},{Address.State}</p>
              </div>:""}
              <div className="address-option" onClick={() => setShowAddressForm(true)}>
                <span className="add-new">ADD NEW</span>
              </div>
            {showAddressForm && <AddressSelector setShowAddressForm={setShowAddressForm} setAddress={setAddress} />}
          </div>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
        </div>

  )
}
    </div >
  );
};


export default CreateOrderSection;
