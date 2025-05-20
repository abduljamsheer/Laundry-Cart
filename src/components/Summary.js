import React from 'react'

function Summary({setShowSummary,setStoreLocation,storeLocation,orderItems}) {
  return (
    <div className="modal-overlay">
          <div className="summary-modal">
            <button className="close-btn" onClick={() => setShowSummary(false)}>×</button>
            <h3>Summary</h3>
            <div className="store-info">
              <input
                value={storeLocation}
                onChange={(e) => setStoreLocation(e.target.value)}
              />
                
              <div>
                <strong>Store Address:</strong> 
                <textarea/>
                <br />
                <strong>Phone:</strong> <input type='text'/>
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
              <div className="address-option">
                <span className="add-new">ADD NEW</span>
              </div>
            </div>
            <button onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
  )
}

export default Summary