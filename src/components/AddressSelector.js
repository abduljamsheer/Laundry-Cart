import React, { useState } from 'react'

function AddressSelector({setShowAddressForm, setAddress}) {
    const [newAddress, setNewAddress] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
  });
   const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save logic here
    setAddress(newAddress)
    console.log("Address saved:", newAddress);
    setShowAddressForm(false);
  };
    return (
        <div className="address-popup">
            <h3>Add New Address</h3>
            <input
                type="text"
                name="label"
                placeholder="Label (e.g., Home, Work)"
                value={newAddress.label}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={newAddress.street}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                value={newAddress.city}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="state"
                placeholder="State"
                value={newAddress.state}
                onChange={handleInputChange}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setShowAddressForm(false)}>Cancel</button>
        </div>
    )
}

export default AddressSelector